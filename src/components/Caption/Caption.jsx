import React from 'react'
import './Caption.css'

const Caption = () => {
  return (
    <div className='caption-content'>
      <p className='caption-text request'>Requisição:  Abertura de chamado para solicitar serviços, informações ou recursos ao Service Desk.</p>
      <p className='caption-text incident'>Incidente: Abertura de chamado para reportar falhas ou interrupções nos serviços de TI.</p>
    </div>
  )
}

export default Caption
