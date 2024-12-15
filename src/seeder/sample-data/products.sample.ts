import { Product } from '../../products/entities/product.entity';

export const productsSample: Product[] = [
  {
    id: "1cbc1e44-1700-4ebb-b0cd-6c0ff42fcba3",
    name: "Paracetamol 1g",
    category: {
      id: "77afd453-c827-44ad-8241-55de04dd25d7",
      name: "Medicación",
      createdAt: new Date("2024-12-15T16:12:38.312Z"),
    },
    createdAt: new Date("2024-12-15T16:27:32.861Z"),
  },
  {
    id: "41739a50-2565-43e2-8097-e1311f4cd52c",
    name: "Fentanest 150 mcg",
    category: {
      id: "77afd453-c827-44ad-8241-55de04dd25d7",
      name: "Medicación",
      createdAt: new Date("2024-12-15T16:12:38.312Z"),
    },
    createdAt: new Date("2024-12-15T16:27:52.374Z"),
  },
  {
    id: "7fa9418d-20d0-408a-8d49-221deb353ef3",
    name: "Parches Desfibrilación Adulto",
    category: {
      id: "1ee151cf-8d41-4348-911f-91386b4d2cd9",
      name: "Electromedicina",
      createdAt: new Date("2024-12-15T16:13:05.130Z"),
    },
    createdAt: new Date("2024-12-15T16:29:16.631Z"),
  }
];