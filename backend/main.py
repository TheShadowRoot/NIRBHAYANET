from fastapi import FastAPI

app = FastAPI(title="NIRBHAYANET Core API")

@app.get("/")
def home():
    return {"status": "Active", "system": "NIRBHAYANET Safety Ecosystem"}

@app.post("/api/sos")
def trigger_sos(lat: float, lng: float, user_id: str):
    return {
        "alert_sent": True,
        "location": {"lat": lat, "lng": lng},
        "nearby_volunteers_notified": 5,
        "status": "EMERGENCY_ACTIVE"
    }
