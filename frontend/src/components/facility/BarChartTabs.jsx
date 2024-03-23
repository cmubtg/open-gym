import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getFacilityHours } from '../../utils/chart_utils';
import { BarChart } from './index'
import { useState } from 'react';

const BarChartTabs = ({facility}, {isMobile}) => {
    const allHours = getFacilityHours(facility);
    console.log(allHours);
    const today = new Date();
    const dayIndex = today.getDay();
    const [tabIndex, setTabIndex] = useState(dayIndex);

    return (
        <Tabs id="controlled_tabs" selectedTabClassName="selected_tab" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
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