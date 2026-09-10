from fastapi import FastAPI

app = FastAPI(title="Interview prep")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
