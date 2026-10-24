"""MongoDB Atlas connection setup and command-line connectivity check."""

import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import (
    ConfigurationError,
    ConnectionFailure,
    InvalidURI,
    NetworkTimeout,
    OperationFailure,
    ServerSelectionTimeoutError,
)
from pymongo.server_api import ServerApi

ENV_FILE = Path(__file__).resolve().with_name(".env")
load_dotenv(ENV_FILE, override=True)

MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
DATABASE_NAME = os.getenv("DATABASE_NAME", "get_lift").strip()


def _make_client() -> MongoClient:
    if not MONGODB_URI:
        raise ConfigurationError("MONGODB_URI is missing or empty in backend/.env")
    if not DATABASE_NAME:
        raise ConfigurationError("DATABASE_NAME is missing or empty in backend/.env")

    # TLS verification is explicitly enabled; never accept invalid certificates.
    return MongoClient(
        MONGODB_URI,
        tls=True,
        tlsAllowInvalidCertificates=False,
        server_api=ServerApi("1"),
        serverSelectionTimeoutMS=8000,
    )


try:
    client = _make_client()
    db = client[DATABASE_NAME]
except (InvalidURI, ConfigurationError) as exc:
    # Keep exception text out of logs: URI parser messages may contain credentials.
    client = None
    db = None
    _configuration_error = (
        "MongoDB URI/configuration is invalid. Check that the Atlas URI is valid, "
        "and URL-encode any special characters in the username or password."
        if isinstance(exc, InvalidURI)
        else (
            "MongoDB DNS lookup failed or timed out. Check network/DNS and the Atlas cluster host."
            if "dns" in str(exc).lower() or "timed out" in str(exc).lower()
            else "MongoDB configuration error. Check the URI and database settings."
        )
    )
else:
    _configuration_error = None


def test_connection() -> bool:
    """Ping MongoDB and report a safe, actionable status without secrets."""
    if _configuration_error:
        print(f"MongoDB configuration error: {_configuration_error}")
        return False

    try:
        client.admin.command("ping")
        print("Connected to MongoDB successfully!")
        return True
    except OperationFailure as exc:
        # Atlas may report authentication rejection as code 8000 rather than 18.
        if exc.code == 18 or "auth" in str(exc).lower():
            print("MongoDB authentication failed. Check the Atlas database user and password.")
        else:
            print(f"MongoDB command failed (code {exc.code}).")
    except (ServerSelectionTimeoutError, NetworkTimeout) as exc:
        details = str(exc).lower()
        if "ssl" in details or "tls" in details or "certificate" in details:
            print("MongoDB TLS handshake failed. Check certificate trust and system date/time.")
        elif "dns" in details or "name resolution" in details:
            print("MongoDB DNS lookup failed or timed out. Check network/DNS and the Atlas cluster host.")
        else:
            print("MongoDB server selection timed out. Check Atlas network access and connectivity.")
    except ConnectionFailure:
        print("MongoDB network connection failed. Check Atlas availability and network access.")
    except (InvalidURI, ConfigurationError):
        print("MongoDB URI/configuration is invalid. Check the URI format and URL-encode credentials.")
    except Exception as exc:
        # Exception strings can contain the URI, so show only the exception class.
        error_name = type(exc).__name__
        if "TLS" in error_name.upper() or "SSL" in error_name.upper():
            print("MongoDB TLS handshake failed. Check certificate trust and system date/time.")
        else:
            print(f"MongoDB connection failed ({error_name}).")
    return False


if __name__ == "__main__":
    raise SystemExit(0 if test_connection() else 1)
