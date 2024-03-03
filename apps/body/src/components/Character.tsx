import { Card, CardHeader, Heading, CardBody, Text } from '@chakra-ui/react'

type Status = {
  color: string
  emoji: string
}

const statuses: Record<string, Status> = {
  Alive: {
    color: 'green',
    emoji: '💚',
  },
  Dead: {
    color: 'red',
    emoji: '😵',
  },
  unknown: {
    color: 'grey',
    emoji: '🤨',
  },
}

const getStatus = (status: string) => (status in statuses ? statuses[status] : statuses.unknown)

interface CharacterProps {
  name: string
  status: string
}

export const Character = ({ name, status }: CharacterProps) => {
  const { emoji } = getStatus(status)
  return (
    <Card>
      <CardHeader>
        <Heading size="md"> {name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>
          {status} - {emoji}
        </Text>
      </CardBody>
    </Card>
  )
}
