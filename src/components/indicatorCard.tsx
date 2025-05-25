import { Card, CardContent, Box, Typography } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface IndicatorCardProps {
  icon: IconDefinition
  title: string
  value: string | number
  caption: string
  indicatorValue: string
  isPositive: boolean
}

export default function IndicatorCard({
  icon,
  title,
  value,
  caption,
  indicatorValue,
  isPositive,
}: IndicatorCardProps) {
  return (
    <Card
      elevation={3}
      sx={{
        minWidth: 250,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
         
          <Box className="w-1/3 flex justify-center">
            <FontAwesomeIcon icon={icon} style={{ fontSize: '2rem', color: '#4B5563' }} />
          </Box>

  
          <Box flexGrow={1}  className="w-2/3">
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>

            <Typography variant="h6" fontWeight="bold">
              {value}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {caption}
            </Typography>
           
            <Box
              display="flex"
              alignItems="center"
              mt={1}
              color={isPositive ? 'success.main' : 'error.main'}
            >
              <ArrowDropUpIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="body2">{indicatorValue}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
