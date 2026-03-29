# BimDown Editor

A browser-based 2D/3D building editor for the [BimDown](https://github.com/NovaShang/bimdown-spec) format.

## Features

- **2D floor plan** — draw walls, place doors/windows/columns, define rooms
- **3D view** — real-time 3D visualization with Three.js
- **All building elements** — walls, doors, windows, columns, slabs, roofs, ceilings, stairs, openings, room separators, structure, MEP
- **Multi-format export** — glTF, IFC, PDF, DXF
- **Multilingual** — English and Chinese

## Getting Started

```bash
git clone https://github.com/NovaShang/bimdown-editor.git
cd bimdown-editor
npm install
cd editor && npm run dev
```

Open http://localhost:5174 in your browser.

## As a Component

The editor is a standalone React component that can be embedded in any web application:

```tsx
import { Editor } from 'bimdown-editor';

<Editor
  dataSource={yourDataSource}
  onSave={handleSave}
/>
```

## Related Projects

- **[bimdown-spec](https://github.com/NovaShang/bimdown-spec)** — the open-source BimDown format specification, CLI tools, and Revit add-in
- **[BimClaw](https://bimclaw.com)** — SaaS platform with AI agent, real-time collaboration, and building analysis

## License

MIT
