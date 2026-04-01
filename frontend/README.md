# Frontend — CraftPortal

Vue 3 + TypeScript SPA for the CraftPortal client-facing portal.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Vite 8](https://vite.dev/) | Dev server & bundler |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Vue Router 4](https://router.vuejs.org/) | Client-side routing |
| [Pinia](https://pinia.vuejs.org/) | Global state management |
| [vue-i18n](https://vue-i18n.intlify.dev/) | Internationalisation (EN / TH) |
| [Axios](https://axios-http.com/) | HTTP client |
| [Bun](https://bun.sh/) | Package manager & runtime |

---

## Source Structure

```
src/
├── main.ts               # App bootstrap — registers plugins (Pinia, i18n, Router)
├── App.vue               # Root component — mounts NavBar + <router-view>
├── style.css             # Global styles, Tailwind import, CSS design tokens
│
├── assets/               # Static images / SVGs bundled by Vite
│
├── lib/                  # Low-level shared utilities
│   └── http.ts           # Axios instance (base URL, Bearer token interceptor)
│
├── components/           # Shared UI components
│   ├── NavBar.vue        # Sticky top navigation — lang switcher + theme toggle
│   └── base/             # Headless, reusable primitives
│       ├── BaseInput.vue # Input with label, prefix icon, error, password toggle
│       └── BaseButton.vue# Button with variants, sizes, loading spinner
│
├── composables/          # Global shared composables
│   └── useTheme.ts       # Dark/light mode toggle — persisted to localStorage
│
├── features/             # Feature modules (self-contained vertical slices)
│   └── auth/
│       ├── types/
│       │   └── index.ts          # LoginCredentials, AuthUser, AuthResponse, FieldErrors
│       ├── services/
│       │   └── auth.service.ts   # login(), logout(), me() — calls /api/auth/*
│       ├── composables/
│       │   └── useAuth.ts        # Form state, validation, API call, error handling
│       └── components/
│           └── LoginForm.vue     # Form UI wired to useAuth + BaseInput/BaseButton
│
├── views/                # Page-level components (1 per route)
│   └── LoginView.vue     # /login — centered card layout with LoginForm
│
├── router/
│   ├── index.ts          # Route definitions and history mode config
│   └── types.d.ts        # RouteMeta type augmentation (hideNav, etc.)
│
└── i18n/
    ├── index.ts          # Creates vue-i18n instance, reads saved locale
    └── locales/
        ├── en.ts         # English strings
        └── th.ts         # Thai strings
```

---

## Feature Module Convention

Every feature lives under `src/features/<feature-name>/` and owns four layers:

```
features/<feature>/
├── types/          # TypeScript interfaces and type aliases for this feature
├── services/       # API calls (uses src/lib/http.ts) — no UI logic
├── composables/    # Reactive state + business logic — no template markup
└── components/     # Vue components scoped to this feature
```

This keeps each feature self-contained. To add a new feature:

1. Create `src/features/<name>/` with the four folders above.
2. Define types first in `types/index.ts`.
3. Implement the service (pure API calls).
4. Write the composable (state + logic, calls the service).
5. Build the component (template only, delegates logic to the composable).
6. Add a view in `src/views/` and register a route in `src/router/index.ts`.

---

## Theming

Design tokens are CSS custom properties defined in [src/style.css](src/style.css).

| Class on `<html>` | Mode |
|---|---|
| `dark` *(default)* | Dark theme |
| *(none)* | Light theme |

All tokens follow the `--cp-*` prefix (CraftPortal):

| Token | Purpose |
|---|---|
| `--cp-bg` | Page background |
| `--cp-surface` | Card / panel background |
| `--cp-surface-2` | Input / slightly elevated surface |
| `--cp-border` | Borders and dividers |
| `--cp-text` | Primary text |
| `--cp-text-muted` | Secondary / label text |
| `--cp-text-subtle` | Placeholder / disabled text |
| `--cp-accent` | Brand colour (violet) |
| `--cp-accent-glow` | Accent at low opacity — focus rings, glows |

Use `useTheme()` to toggle or initialise the theme:

```ts
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme, initTheme } = useTheme()
```

---

## Internationalisation (i18n)

Supported locales: **English** (`en`) and **Thai** (`th`).

Translation files live in `src/i18n/locales/`. All strings are namespaced by feature:

```ts
// en.ts
{
  nav:   { dashboard, projects, clients, settings },
  auth:  { login: { … }, validation: { … } },
  lang:  { … },
  theme: { … },
}
```

In components:

```ts
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

t('auth.login.title')  // → 'Welcome back'
locale.value = 'th'    // switches language at runtime
```

The selected locale is saved to `localStorage` under the key `cp-lang`.

---

## Path Alias

`@` resolves to `src/`. Configured in both `vite.config.ts` and `tsconfig.app.json`.

```ts
import { useTheme }    from '@/composables/useTheme'
import { authService } from '@/features/auth/services/auth.service'
import LoginView       from '@/views/LoginView.vue'
```

---

## Development

```bash
# Install dependencies
bun install

# Start dev server  →  http://localhost:5173
bun run dev

# Type-check + build
bun run build
```

Via Docker (runs behind nginx reverse proxy on port 80):

```bash
# From the project root
docker compose up --build frontend
```
