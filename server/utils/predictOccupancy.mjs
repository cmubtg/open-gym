
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);
const predictOccupancy = async (gym, date) => {
    const script = "forecast/predict.py"
    console.log(date.getDay());
    const command = `python ${script} 
    --day_of_week ${date.getDay()} 
    --month ${date.getMonth()} 
    --hour ${date.getHours()} 
    --is_weekend ${true} 
    --is_holiday ${false} 
    --is_start_of_semester ${false} 
    --temperature ${72.0}`;
    // different OS use different newline breaks
    // Remove newline breaks
    command = command.replace(/(\r\n|\n|\r)/gm,"");
    try {
        const { stdout, stderr} = await execAsync(command);
        console.log(stdout);
        return parseInt(stdout, 10);
    } catch(error) {
        console.log(`Running Python Script error: ${error}`)
        return NaN;
    }
}

// TODO: Make isClosed function return close bool
const isClosed = (date) => {
    return false;
}

export {isClosed, predictOccupancy};