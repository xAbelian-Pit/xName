import React from 'react'
import { Helmet } from 'react-helmet-async'

import emojiThinkingFace from '../../assets/emojis/thinking-face.svg'
import Container from '../../components/Container'

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Uh oh... xName</title>
      </Helmet>
      <Container>
        <section>
          <div>
            <img src={emojiThinkingFace} alt="xName" className="h-full max-h-32 m-auto" />
          </div>
          <div className="pt-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">Uh oh... Page Not Found!</div>
          </div>
        </section>
      </Container>
    </>
  )
}
