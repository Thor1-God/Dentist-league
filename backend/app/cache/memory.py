from datetime import datetime, timedelta
from typing import Any


_cache_data: Any = None
_cache_updated_at: datetime | None = None


CACHE_TTL_SECONDS = 60


def get_cache():
    global _cache_data, _cache_updated_at

    if _cache_data is None or _cache_updated_at is None:
        return None

    age = datetime.now() - _cache_updated_at

    if age > timedelta(seconds=CACHE_TTL_SECONDS):
        return None

    return _cache_data


def set_cache(data):
    global _cache_data, _cache_updated_at

    _cache_data = data
    _cache_updated_at = datetime.now()


def clear_cache():
    global _cache_data, _cache_updated_at

    _cache_data = None
    _cache_updated_at = None