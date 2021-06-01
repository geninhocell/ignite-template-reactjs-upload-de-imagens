/* eslint-disable import/no-extraneous-dependencies */
import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [url, setUrl] = useState('');

  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(image_url: string): void {
    setUrl(image_url);
  }

  return (
    <SimpleGrid columns={3} spacing="40px">
      {cards &&
        cards.map(card => (
          <Box w="290px" h="290px" onClick={onOpen} background="transparent">
            <Card key={card.id} data={card} viewImage={handleViewImage} />
          </Box>
        ))}

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={url} />
    </SimpleGrid>
  );
}
