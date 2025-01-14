'use client';

import { spaceGrotesk, unica77 } from '@/fonts';
import { appInfo, chains, wagmiConfig } from '../src/setupWagmi';
import { ConnectButton, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { arbitrumGoerli } from 'wagmi/chains';
import { PostHogProvider } from 'posthog-js/react';

import '@rainbow-me/rainbowkit/styles.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'; // icons
import 'primereact/resources/primereact.css'; // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import '@/styles/globals.css';
import posthog from 'posthog-js';

if (typeof window !== 'undefined' && typeof process.env.NEXT_PUBLIC_POSTHOG_KEY === 'string') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV !== 'production') {
        // when in dev, you can see data that would be sent in prod (in devtools)
        posthog.debug();
      }
    },
    // store data in temporary memory that expires with each session
    persistence: 'memory',
    autocapture: true,
    disable_session_recording: true,
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={unica77.style}>
        <PostHogProvider client={posthog}>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
              chains={chains}
              appInfo={appInfo}
              initialChain={arbitrumGoerli}
              theme={{
                ...lightTheme({
                  accentColor: '#243145',
                }),
                fonts: {
                  body: spaceGrotesk.style.fontFamily,
                },
              }}
            >
              <Head>
                <title>Arbitrum Orbit Deployment UI</title>
              </Head>
              <header className="flex w-full justify-center">
                <div className="flex w-[1024px] flex-col gap-2 py-4">
                  <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-normal">Arbitrum Orbit</h1>
                    <ConnectButton />
                  </div>
                  <div>
                    <span className="rounded-lg bg-[#FFEED3] px-3 py-2 text-sm text-[#60461F]">
                      This interface is currently intended for local devnet deployment.
                    </span>
                  </div>
                </div>
              </header>
              <main className="flex w-full flex-col items-center">{children}</main>
            </RainbowKitProvider>
          </WagmiConfig>
        </PostHogProvider>
      </body>
    </html>
  );
}
