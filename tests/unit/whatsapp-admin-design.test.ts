import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("/whatsapp admin redesign guardrails", () => {
  it("defaults the whatsapp theme to light mode", () => {
    const source = read("src/components/whatsapp/theme-provider.tsx");

    expect(source).toContain('useState<WhatsappThemeMode>("light")');
  });

  it("caps shared whatsapp surface radii at 5px", () => {
    const cardSource = read("src/components/ui/card.tsx");
    const buttonSource = read("src/components/ui/button.tsx");
    const badgeSource = read("src/components/ui/badge.tsx");

    expect(cardSource).toContain("rounded-[5px]");
    expect(buttonSource).toContain("rounded-[5px]");
    expect(badgeSource).toContain("rounded-[5px]");
  });

  it("removes decorative orb and grid layers from the whatsapp shell", () => {
    const shellSource = read("src/components/whatsapp/shell.tsx");

    expect(shellSource).not.toContain("whatsapp-orb");
    expect(shellSource).not.toContain("whatsapp-grid");
  });
});
