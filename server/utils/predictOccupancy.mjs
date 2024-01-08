
import util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);

// app.get('/runPython', (req, res) => {
//     // Replace 'your_script.py' with the actual path to your Python script
//     const pythonScriptPath = 'path/to/your_script.py';

//     // Run the Python script
//     exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error}`);
//             return res.status(500).send('Internal Server Error');
//         }

//         console.log(`Python script output: ${stdout}`);
//         res.send(stdout);
//     });
// });

const predictOccupancy = async (gym, timestamp) => {
    return 1;
    const command = "python /forecast/predict.py";
    try {
        const { stdout, stderr} = await execAsync(command);
        return parseInt(stdout, 10);
    } catch(error) {
        return NaN;
    }
}

const isClosed = (date) => {
    return false;
}

export {isClosed, predictOccupancy};