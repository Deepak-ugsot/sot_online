/**
 * Public API for the conversations feature.
 *
 * Routes import from `@/features/conversations` only — never from an internal
 * component path.
 */
export { ConversationsSection } from "./components/conversations-section";
export type {
  ConversationsClip,
  ConversationsFeaturedVideo,
  ConversationsHeadingCopy,
  ConversationsPortrait,
  ConversationsQuote,
} from "./types/conversations.types";
