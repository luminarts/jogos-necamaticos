"use client"
import { useState } from "react";
import FunilButton from "../client_components/FunilButton";

export default function Funil() {

  /* Jogo: Funil
  1 a 3: origem - buttons - final
  4 a 7: origem - emb - buttons - final || origem - buttons - emb - final
  8 a 10: origem - emb - emb - buttons - final || origem - buttons - emb - emb - final || origem - emb - buttons - emb - final
  11 a 13: origem - buttons - emb - buttons - final
  */

  /* 
    Tenho que ter a resposta desde o início e depois incluir a resposta em um index aleatório de uma lista de 3 elementos (os botões)
  */

  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState(null);


  // FUNÇÕES AUXILIARES
  function generateFunil() {
    var embaralhosAux = [];
    if (level <= 3) {
      // Aqui não tem embaralhos


    } else if (level >=4 && level <= 7) {
      // Aqui tem 1 embaralho

    } else if (level >=8 && level <= 10) {
      // Aqui tem 2 embaralhos

    } else if (level >=8) {
      // Aqui tem 1 embaralho
    }
  }

  function toggleOtherOptions() {

  }

  return(
    <div className="flex justify-center items-center">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <p>Ordem inicial</p>
          <p>Imagens</p>
        </div>
        <div className="flex flex-row">
          <FunilButton>1</FunilButton>
          <FunilButton>2</FunilButton>
          <FunilButton>3</FunilButton>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Ordem final</p>
          <p>Imagens</p>
        </div>
      </div>
    </div>
  );
}