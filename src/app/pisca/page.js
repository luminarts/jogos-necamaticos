"use client"
import {useState, useEffect} from 'react'
import blinkGrid from '../client_components/blinkGrid';

export default function Pisca() {
  /* Coisas que faltam fazer:
  - fazer o blink dos quadrados
  - função de checar pra ver se arrays são iguais
  - checar a cada clique se equivale ao quadrado 
  - fazer um useEffect pra variavel os eligibleIds pra quando ela mudar, redistribuir os Ids entre os botões (deixar independente do tamanho do grid)
  - botão para começar o blink
  */


  return (
<div className="flex flex-col justify-center items-center">
  <div className="h-screen flex flex-row items-center justify-center">
    <div
    className="grid gap-2">

    </div>
  </div>
</div>
  );
}