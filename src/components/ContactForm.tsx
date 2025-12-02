"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simular envio (você pode integrar com uma API real aqui)
    try {
      // Aqui você faria a chamada para sua API
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay
      
      setStatus("success");
      setFormData({ nome: "", email: "", assunto: "", mensagem: "" });
      
      // Reset status após 5 segundos
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
          Nome completo *
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          value={formData.nome}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Seu nome"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="seu@email.com"
        />
      </div>

      {/* Assunto */}
      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-2">
          Assunto *
        </label>
        <select
          id="assunto"
          name="assunto"
          required
          value={formData.assunto}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
        >
          <option value="">Selecione um assunto</option>
          <option value="duvida">Dúvida</option>
          <option value="sugestao">Sugestão de Pauta</option>
          <option value="correcao">Correção de Notícia</option>
          <option value="publicidade">Publicidade</option>
          <option value="reclamacao">Reclamação</option>
          <option value="elogio">Elogio</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          value={formData.mensagem}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Digite sua mensagem..."
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">
            Mensagem enviada com sucesso! Retornaremos em breve.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">
            Erro ao enviar mensagem. Tente novamente ou envie para contato@primeiranews.com
          </p>
        </div>
      )}

      {/* Botão Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group"
      >
        {status === "sending" ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Enviar Mensagem
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Ao enviar esta mensagem, você concorda com nossa{" "}
        <a href="/politica-de-privacidade" className="text-blue-600 hover:underline">
          Política de Privacidade
        </a>
      </p>
    </form>
  );
}
