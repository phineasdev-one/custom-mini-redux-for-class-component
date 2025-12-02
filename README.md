# React 15 TypeScript App

Dự án React 15 sử dụng class components với TypeScript và Node 8.

## Yêu cầu

- Node.js 8.x
- npm hoặc yarn

## Cài đặt

```bash
npm install
```

## Chạy dự án

### Development mode
```bash
npm run dev
```
Ứng dụng sẽ chạy tại http://localhost:3000

### Build production
```bash
npm run build
```

## Cấu trúc dự án

```
react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Counter.tsx
│   │   ├── Counter.css
│   │   ├── TodoList.tsx
│   │   └── TodoList.css
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Các component

- **App**: Component chính
- **Counter**: Component đếm số với state
- **TodoList**: Component quản lý danh sách công việc

Tất cả các component đều sử dụng class component syntax của React 15.

# custom-mini-redux-for-class-component
