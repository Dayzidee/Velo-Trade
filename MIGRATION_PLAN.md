# Mock → Real Data Migration Plan

This document outlines what needs to change when migrating each feature from mock/placeholder data to real API integrations.

---

## 1. Asset Selector / Market Watch
**Current**: Hardcoded array of 20+ trading pairs with fake 24h prices
**Migration**:
- Replace with Binance REST: `GET /api/v3/ticker/24hr` (returns all pairs)
- Add WebSocket: `wss://stream.binance.com:9443/ws/!ticker@arr` for all tickers
- Filter to supported pairs only

## 2. Order Placement (Market/Limit/Stop-Loss)
**Current**: Console.log on submit, mock order ID returned
**Migration**:
- Integrate with user's exchange API keys (stored encrypted server-side)
- Binance: `POST /api/v3/order` with HMAC signature
- Requires backend proxy to protect API secrets — **never expose keys client-side**
- Add WebSocket user data stream for order status updates

## 3. Positions / Trade History
**Current**: localStorage mock trades array
**Migration**:
- Binance: `GET /api/v3/openOrders`, `GET /api/v3/allOrders`, `GET /api/v3/myTrades`
- User data WebSocket stream for real-time position updates
- Backend service to aggregate and compute P&L

## 4. Wallet / Deposit / Withdrawal
**Current**: Static mock balances, fake QR codes
**Migration**:
- **Deposit**: Generate real deposit addresses via exchange API or custodial wallet service
- **Withdrawal**: Exchange API withdrawal endpoint with 2FA confirmation
- **Balance**: `GET /api/v3/account` for real balances
- Requires: Full KYC flow, backend wallet service, security audit

## 5. Copy-Trading
**Current**: Mock "Master Trader" profiles with random stats
**Migration**:
- Requires custom backend service:
  - Master trader registration and performance tracking DB
  - Trade mirroring engine (listen to master's trades, execute proportional copies)
  - Risk multiplier logic in the backend order execution layer
- WebSocket notifications for copied trade events

## 6. Technical Indicators
**Current**: Calculated client-side from candle data (already real)
**Migration**: **No migration needed** — indicators are pure math on real candle data. Already production-ready once candle data is live.

## 7. Order Book
**Current**: Mock bid/ask arrays
**Migration**:
- Binance WebSocket: `wss://stream.binance.com:9443/ws/btcusdt@depth20@100ms`
- Process depth snapshots client-side

## 8. Settings / 2FA / API Keys
**Current**: "Coming Soon" badges
**Migration**:
- Requires full auth backend (JWT/session management)
- Encrypted API key storage (AES-256 server-side)
- TOTP 2FA integration (e.g., Google Authenticator)
- Telegram Bot API for account linking

---

## Priority Order for Migration
1. **Indicators** (zero backend work, already using real data)
2. **Order Book** (single WebSocket, no auth needed)
3. **Asset Selector** (single REST call + WebSocket, no auth)
4. **Positions/Orders** (requires auth backend — medium effort)
5. **Wallet** (requires auth + custodial infrastructure — high effort)
6. **Copy-Trading** (requires custom backend service — highest effort)
7. **Settings/2FA/API Keys** (requires full auth system)
