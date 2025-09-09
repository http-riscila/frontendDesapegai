import { useState, useRef } from "react";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";
import {
  createCommunity,
  addCommunityImage,
} from "../services/community-service";
import { validateCreateCommunity } from "../validators/community-validation";

const CreateCommunityModal = ({ isOpen, onClose, onCommunityCreated }) => {
  const [communityData, setCommunityData] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setCommunityData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleImageClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setCommunityData((prevData) => ({
        ...prevData,
        imageUrl: file,
      }));
    }
  }

  async function handleCreateCommunity(e) {
    e.preventDefault();

    const { imageUrl, ...communityInfo } = communityData;

    const errors = validateCreateCommunity(communityInfo);
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      Object.values(errors).forEach((msg) =>
        toast.warning(msg, {
          className: "toast-warning",
          progressClassName: "Toastify__progress-bar",
        })
      );
      return;
    }

    try {
      const newCommunity = await createCommunity(communityInfo, imageUrl);
      console.log("Comunidade criada com sucesso:", newCommunity);

      if (imageUrl) {
        const formData = new FormData();
        formData.append("communityImage", imageUrl);
        const addedImage = await addCommunityImage(formData, newCommunity.id);
        console.log("Community image added", addedImage);
        newCommunity.imageUrl = addedImage.imageUrl;
        onCommunityCreated?.(newCommunity);
      }

      toast.success("Comunidade criada com sucesso!", {
        className: "toast-success",
        progressClassName: "Toastify__progress-bar",
      });
    } catch (error) {
      toast.error("Erro ao criar comunidade", {
        className: "toast-error",
        progressClassName: "Toastify__progress-bar",
      });
      console.error("Erro ao criar comunidade:", error);
    } finally {
      onClose();
      setCommunityData({
        name: "",
        description: "",
        imageUrl: "",
      });
      setPreviewImage(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <img
              src="src/assets/icons/plus.svg"
              className="h-8 w-8 text-[#1B5FFF]"
            />
            <h2 className="text-xl font-semibold text-gray-900">
              Criar comunidade
            </h2>
          </div>
          <Button
            onClick={onClose}
            className="cursor-pointer rounded-xl border !bg-white px-1 py-1 hover:!bg-gray-100"
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 46 46"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.6569 17.3431L17.3431 28.6569M28.6569 28.6569L17.3431 17.3431"
                stroke="#111827"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleCreateCommunity} className="space-y-6 p-6 pt-4">
          {/* Image Upload - First */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Foto da comunidade
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className="cursor-pointer rounded-xl border-2 border-dashed border-blue-300 p-8 text-center transition-colors hover:border-blue-400"
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mb-3 h-32 w-full rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600">
                    Clique para alterar a imagem
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center">
                    <img
                      src="src/assets/icons/image.svg"
                      className="h-18 w-18 text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Adicionar foto de capa
                    </p>
                    <p className="text-sm text-gray-500">Clique aqui</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Community Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Nome da comunidade
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ex: Trocas de Roupas São Paulo"
              value={communityData.name}
              onChange={handleChange}
              className="w-full rounded-xl border-2 border-blue-200 px-4 py-3 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Descrição da comunidade
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Descreva o objetivo da comunidade, regras de troca e outras informações importantes para os membros"
              value={communityData.description}
              maxLength={100}
              onChange={handleChange}
              rows="5"
              className="w-full resize-none rounded-xl border-2 border-blue-200 px-4 py-3 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-100 p-6">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-xl border border-[var(--color-secondary)] px-6 py-3 font-medium text-[var(--color-secondary)] transition-colors duration-700 hover:bg-[var(--color-secondary)] hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 cursor-pointer rounded-xl bg-[var(--color-primary)] px-6 py-3 font-medium text-white transition-colors duration-700 hover:bg-[var(--color-tertiary)]"
              >
                Criar Comunidade
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;
