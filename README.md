<p align="center">
	<img src="public/ideahub0-title.svg" alt="IdeaHub0" width="220" />
</p>

<p align="center">A visual home for startup ideas, pitches, and the people building them.</p>

## Overview

IdeaHub0 is a startup discovery and publishing platform built with Next.js. Visitors can browse and search startup ideas, open detailed pitches, and explore creator profiles. Signed-in creators can publish their own startup with a description, category, image, and Markdown pitch.

Content is stored in Sanity, GitHub handles authentication, and the app includes an embedded Sanity Studio for content management.

## Features

- Browse the latest startup ideas.
- Search by title, category, or creator.
- View startup details, pitch content, author information, and view counts.
- Explore creator profiles and their published startups.
- Sign in with GitHub through NextAuth.
- Create startup submissions with Zod validation and image URL verification.
- Edit and manage content in the Sanity Studio.
- Receive live Sanity content updates.
- Monitor errors and replay sessions with Sentry.

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage, search, and startup grid |
| `/startup/[id]` | Startup details and Markdown pitch |
| `/startup/create` | Authenticated startup submission form |
| `/user/[id]` | Creator profile and submissions |
| `/studio` | Embedded Sanity Studio |
| `/api/auth/[...nextauth]` | GitHub authentication handlers |

The Sentry example page and API route are included for monitoring diagnostics.

## Tech Stack

- Next.js 16 App Router, React 19, and TypeScript
- Sanity 5 and `next-sanity`
- NextAuth v5 with the GitHub provider
- Tailwind CSS and local Work Sans fonts
- Motion animations and Lucide icons
- Zod, Markdown rendering, and Radix Toast
- Sentry error monitoring and replay

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Sanity project and dataset
- A GitHub OAuth application

### Install

The repository is configured for Yarn Plug'n'Play:

```bash
yarn install
```

You can use npm instead if preferred, but keep one package manager and its lockfile as the source of truth.

### Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-05-05
NEXT_SERVER_TOKEN=your_sanity_server_token
NEXT_BROWSER_TOKEN=your_sanity_browser_token
SANITY_WRITE_TOKEN=your_sanity_write_token
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_SECRET=your_nextauth_secret
AUTH_URL=http://localhost:3000
```

Configure the GitHub OAuth callback URL as `http://localhost:3000/api/auth/callback/github` for local development. Never commit `.env.local` or expose write tokens in client-side code.

### Run locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## Sanity Content Model

The active schema is registered in [`sanity/schemaTypes/index.ts`](sanity/schemaTypes/index.ts).

- **Author**: GitHub identity, profile details, avatar, and biography.
- **Startup**: title, slug, author reference, views, description, category, image URL, and Markdown pitch.
- **Playlist**: grouped startup references used for related content.

Sanity queries and live content helpers live in [`sanity/lib`](sanity/lib), while authenticated writes are handled by [`lib/actions.ts`](lib/actions.ts).

## Useful Commands

```bash
yarn dev       # Start the development server
yarn build     # Create a production build
yarn start     # Serve the production build
yarn lint      # Run linting
```

There is currently no automated test script in `package.json`.

## Project Structure

```text
app/              Next.js routes, layouts, API handlers, and UI components
components/ui/    Shared form and toast primitives
lib/              Server actions, validation, and utilities
sanity/           Sanity client, queries, Studio config, and schemas
public/           Static assets, including the README title image
```

## Deployment

Build and run the production app with:

```bash
yarn build
yarn start
```

For a hosted deployment, configure the same environment variables in the platform settings and update `AUTH_URL` and the GitHub OAuth callback URL to the production domain.

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository and create a focused branch.
2. Install dependencies with `yarn install`.
3. Make the change and run `yarn lint` and `yarn build`.
4. Open a pull request describing the change and its verification.

Please keep pull requests focused, avoid committing secrets, and update the README when setup or user-facing behavior changes.

### Contributor License

By submitting a contribution to IdeaHub0, you agree that your contribution is provided under the MIT License included in this repository. You confirm that you have the right to submit the work and that it does not knowingly include material that cannot be licensed under those terms.

## Author

IdeaHub0 is authored and maintained by [kuria3000](https://github.com/kuria3000).

## License

IdeaHub0 is licensed under the [MIT License](LICENSE).
