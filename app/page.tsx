"use client";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// تعريف نوع الرموز المتطايرة عشان TypeScript يفهمها
interface SymbolItem {
  id: number;
  icon: string;
  left: string;
  duration: number;
  delay: number;
}

export default function LoginPage() {
  const [password, setPassword] = useState<string>("");
  const [symbols, setSymbols] = useState<SymbolItem[]>([]);
  const router = useRouter();

  // توليد رموز عشوائية للخلفية
  useEffect(() => {
    const icons = ["🌙", "🎁", "🎉", "🌸", "⭐"];
    const newSymbols: SymbolItem[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 100 + "%",
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
    }));
    setSymbols(newSymbols);
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "Nour") {
      router.push("/about");
    } else {
    router.push("/about");
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      {/* الخلفية التفاعلية */}
      {symbols.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          style={{ ...(styles.symbol as React.CSSProperties), left: s.left }}
        >
          {s.icon}
        </motion.div>
      ))}

      {/* الفورم في نص الشاشة */}
      <form onSubmit={handleLogin} style={styles.form as React.CSSProperties}>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          style={styles.input as React.CSSProperties}
        />
        <button type="submit" style={styles.button as React.CSSProperties}>Login</button>
      </form>
    </div>
  );
}

// التنسيقات زي ما هي بالظبط
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#3e2723",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    position: "absolute",
    fontSize: "2rem",
    pointerEvents: "none",
  },
  form: {
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    backdropFilter: "blur(5px)",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    textAlign: "center",
  },
  button: {
    padding: "10px",
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};