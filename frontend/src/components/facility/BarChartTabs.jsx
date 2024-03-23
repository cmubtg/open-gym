import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getFacilityHours } from '../../utils/chart_utils';
import { BarChart } from './index'

const BarChartTabs = ({facility}, {isMobile}) => {
    const allHours = getFacilityHours(facility);
    const today = new Date();
    return (
        <Tabs>
            <TabList>
                <Tab>Sun</Tab>
                <Tab>Mon</Tab>
                <Tab>Tue</Tab>
                <Tab>Wed</Tab>
                <Tab>Thur</Tab>
                <Tab>Fri</Tab>
                <Tab>Sat</Tab>
            </TabList>
            
            {allHours.map((value, index) => (
                <TabPanel>
                    <BarChart facility={facility} isMobile={isMobile} hours={value} day={index}></BarChart>
                </TabPanel>
            ))}
        </Tabs>
    );
}

export default BarChartTabs;