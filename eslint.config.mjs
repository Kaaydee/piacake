import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Tắt lỗi khi dùng any
      "@typescript-eslint/no-unused-vars": "warn", // Chuyển unused vars thành cảnh báo thay vì lỗi
    },
  },
];

export default eslintConfig;
