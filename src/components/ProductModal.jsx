import { ITEM_CATEGORY_LABELS } from "../labels/EnumLabels.js";

export default function ProductModal({ isOpen, onClose, ad }) {

  if (!isOpen || !ad) return null;

  const formatDate = (date) => {
    const now = new Date();
    const adDate = new Date(date);
    const diffInDays = Math.floor((now - adDate) / (1000 * 60 * 60 * 24));

    if (diffInDays < 30 && diffInDays >= 1) {
      return `Há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInDays < 1) {
      return "Hoje";
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `Há ${months} mês${months > 1 ? 'es' : ''}`;
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="fixed inset bg-white w-xl flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Detalhes do anúncio
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 mt-16">
          {/* Main Image */}
          <div className="mb-4">
            <img
              src={ad.imageUrl}
              alt={ad.name}
              className="h-98 w-full aspect-square rounded-lg object-cover"
            />
          </div>

          {/* Product Title */}
          <h3 className="mb-3 text-lg font-bold text-gray-900">{ad.name}</h3>

          {/* Tags */}
          <div className="mb-4 flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              40 visualizações
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              { // Formata a data para mostrar 'Há X dias' ou 'Há X meses'
                formatDate(ad.createdAt)
              }
            </span>
          </div>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {ITEM_CATEGORY_LABELS[ad.category]}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="mb-2 font-semibold text-gray-900">Descrição</h4>
            <p className="text-sm leading-relaxed text-gray-600">
              {ad.description}
            </p>
          </div>

          {/* Item State */}
          <div className="mb-6">
            <h4 className="mb-2 font-semibold text-gray-900">Estado do item</h4>
            <span className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
              Excelente estado
            </span>
          </div>

          {/* Owner Info */}
          <div className="mb-6">
            <h4 className="mb-3 font-semibold text-gray-900">
              Informações do proprietário
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={
                  ad.creator.profileImageUrl ||
                  "../src/assets/icons/profile-pic.svg"
                }
                alt={ad.creator.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {ad.creator.name}
                </p>
                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Membro desde: Janeiro 2024</span>
              <span>Trocas realizadas: 12</span>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-6 rounded-lg bg-orange-50 p-4">
            <h4 className="mb-2 font-medium text-orange-800">
              Como funciona a troca
            </h4>
            <ul className="space-y-1 text-xs text-orange-700">
              <li>1. Proponha um item seu na troca</li>
              <li>2. O proprietário avalia sua proposta</li>
              <li>3. Combinem local e horário para a troca</li>
              <li>4. Realizem a troca presencialmente</li>
            </ul>
          </div>

          {/* Action Button */}
          <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            Propor Troca
          </button>
        </div>
      </div>
    </div>
  );
}
