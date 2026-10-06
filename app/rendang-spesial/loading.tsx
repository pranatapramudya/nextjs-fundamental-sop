export default function LoadingDapur() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          padding: "1.5rem",
          backgroundColor: "#fef3c7",
          border: "2px dashed #f59e0b",
          borderRadius: "8px",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ color: "#b45309", margin: "0 0 0.5rem 0" }}>
          🍵 Teh Tawar Hangat & Kerupuk Disajikan!
        </h2>
        <p style={{ color: "#78350f", margin: 0, fontSize: "0.95rem" }}>
          <em>
            "Koki lagi ngeracik Rendang Spesial 8 Jam di dapur belakang... <br />
            Silakan minum teh tawar dulu ya bos, jangan kabur dulu!"
          </em>
        </p>

        {/* Efek animasi piring kerlap-kerlip / Skeleton loader sederhana */}
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
          <span style={{ fontSize: "0.85rem", color: "#92400e" }}>
            Sedang memasak kuah santan... (Loading.tsx otomatis aktif!)
          </span>
        </div>
      </div>
    </div>
  );
}
