"use client";

import type { DecoratedInventoryItem } from "../SuiteApp";

interface InventoryProps {
  inventory: DecoratedInventoryItem[];
  lowStockCount: number;
}

export default function Inventory({ inventory, lowStockCount }: InventoryProps) {
  return (
    <section className="suite-card">
      <div className="suite-card-head">
        <div>
          <p className="suite-card-eyebrow">Supplies</p>
          <h2 className="suite-card-title">{lowStockCount} items below alert level</h2>
        </div>
      </div>
      <div className="suite-table-wrap">
        <table className="suite-table">
          <thead><tr><th>Item</th><th>Category</th><th style={{ textAlign: "right" }}>On hand</th><th style={{ textAlign: "right" }}>Alert at</th><th>Level</th><th style={{ textAlign: "right" }}>Action</th></tr></thead>
          <tbody>
            {inventory.map((it) => (
              <tr key={it.id}>
                <td style={{ fontWeight: 700 }}>{it.name}</td>
                <td style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--suite-neutral-600)" }}>{it.category}</td>
                <td style={{ textAlign: "right", fontWeight: 800, fontVariantNumeric: "tabular-nums", color: it.fg }}>{it.stock} {it.unit}</td>
                <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--suite-neutral-700)" }}>{it.minAlert}</td>
                <td>
                  <span style={{ display: "block", width: 120, height: 8, background: "var(--suite-neutral-200)" }}>
                    <span style={{ display: "block", height: 8, width: `${it.pct}%`, background: it.fill }} />
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="suite-btn suite-btn-secondary" style={{ minHeight: 30, padding: "0 10px", fontSize: 12 }} onClick={it.restock}>Restock +5</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
