import { Box } from '@mui/material'
import IndicatorCard from '../../components/indicatorCard'
import {
  faUsers,
  faChartLine,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function DashboardIndicatorCards() {
  return (
    <Box >
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        <Box className={'w-full'}>
          <IndicatorCard
            icon={faUsers}
            title="Total Users"
            value="1,234"
            caption="Feb1 - Today"
            indicatorValue="12%"
            isPositive={true}
          />
        </Box>

        <Box  className={'w-full'}>
          <IndicatorCard
            icon={faChartLine}
            title="Active Sessions"
            value="$23,456"
             caption="Feb1 - Today"
            indicatorValue="80%"
            isPositive={true}
          />
        </Box>

        <Box  className={'w-full'}>
          <IndicatorCard
            icon={faShoppingCart}
            title="Sales Revenue"
            value="320"
             caption="Feb1 - Today"
            indicatorValue="13% "
            isPositive={false}
          />
        </Box>
      </Box>
    </Box>
  )
}
