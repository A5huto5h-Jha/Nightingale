import re

def validate_upi_vpa(vpa: str) -> bool:
    """
    FEATURE HINT [VPA Validation]:
    Regex to ensure correct UPI ID format.
    """
    pattern = r'^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$'
    return bool(re.match(pattern, vpa))
