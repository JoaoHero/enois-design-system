import { FileText, Image, Video } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ComposerLauncherProps } from "../../types/domain/post/composer-launcher-props.js";
import { UserAvatar } from "../avatar/user-avatar.js";

/**
 * Área de Criação de Publicação:
 * - Avatar redondo à esquerda
 * - Input em formato 'pill' com o texto placeholder "Começar publicação"
 * - Barra de ações horizontal com ícones e textos: Vídeo, Foto, Escrever artigo
 */
export function ComposerLauncher({
  avatar,
  avatarFrame,
  name,
  placeholder,
  onOpen,
  onAddMedia,
  onAddVideo,
  onWriteArticle,
}: ComposerLauncherProps) {
  const messages = useMessages().composerLauncher;
  const videoHandler = onAddVideo ?? onAddMedia ?? onOpen;
  const photoHandler = onAddMedia ?? onOpen;
  const articleHandler = onWriteArticle ?? onOpen;

  return (
    <div className="rounded-2xl border border-border-soft bg-surface-card p-3.5 shadow-[var(--shadow-table)] sm:p-4">
      <div className="flex items-center gap-3">
        <UserAvatar
          frame={avatarFrame}
          frameOverflow="hidden"
          src={avatar}
          alt={name}
          className="h-11 w-11 shrink-0 rounded-full"
        />

        <button
          type="button"
          onClick={onOpen}
          className="flex h-11 min-w-0 flex-1 items-center rounded-full border border-border-soft bg-surface-card px-4 text-left text-sm font-medium text-text-date transition hover:border-border hover:bg-surface-2/60 hover:text-text-strong"
        >
          {placeholder ?? messages.placeholder ?? "Começar publicação"}
        </button>
      </div>

      <div className="mt-3 flex items-center justify-around border-t border-border-soft/60 pt-3 sm:justify-start sm:gap-6">
        <button
          type="button"
          onClick={videoHandler}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-subtle transition hover:bg-surface-2 hover:text-text-strong sm:text-sm"
        >
          <Video className="h-5 w-5 text-emerald-500" />

          <span>Vídeo</span>
        </button>

        <button
          type="button"
          onClick={photoHandler}
          aria-label={onAddMedia ? messages.addMedia : undefined}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-subtle transition hover:bg-surface-2 hover:text-text-strong sm:text-sm"
        >
          <Image className="h-5 w-5 text-sky-500" />

          <span>Foto</span>
        </button>

        <button
          type="button"
          onClick={articleHandler}
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-text-subtle transition hover:bg-surface-2 hover:text-text-strong sm:text-sm"
        >
          <FileText className="h-5 w-5 text-amber-500" />

          <span>Escrever artigo</span>
        </button>
      </div>
    </div>
  );
}
