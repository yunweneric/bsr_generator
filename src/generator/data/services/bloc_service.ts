import * as path from "path";
import { FileManagerService } from "../../../shared/services/file_write_service";

// BlocFileService that uses FileManagerService
class BlocFileService extends FileManagerService {
  // Method to create Bloc, Events, and States files
  create(blocName: string, folder: string): boolean {
    // Create Bloc file
    const blocFilePath = path.join(folder, `${blocName}.bloc.ts`);
    if (this.createFile(blocName, folder, ".ts")) {
      return false; // Return false if any file creation fails
    }

    // Create Events file
    const eventsFilePath = path.join(folder, `${blocName}.events.ts`);
    if (this.createFile(blocName + ".events", folder, ".ts")) {
      return false; // Return false if any file creation fails
    }

    // Create States file
    const statesFilePath = path.join(folder, `${blocName}.states.ts`);
    if (this.createFile(blocName + ".states", folder, ".ts")) {
      return false; // Return false if any file creation fails
    }

    // Return true if all files are created
    return true;
  }

  // Method to write default Bloc template data
  writeBlocData(blocName: string, folder: string): boolean {
    const blocFilePath = path.join(folder, `${blocName}.bloc.ts`);
    const blocData = `
import { EventEmitter } from 'events';
import { ${blocName}Event } from './${blocName}.events';
import { ${blocName}State } from './${blocName}.states';

class ${blocName}Bloc {
  private events = new EventEmitter();
  private state: ${blocName}State = {} as ${blocName}State;

  constructor() {}

  addEvent(event: ${blocName}Event) {
    // Logic to handle events
    this.events.emit(event.type, event);
  }

  // Your Bloc logic to update the state
  setState(state: ${blocName}State) {
    this.state = state;
  }
}

export { ${blocName}Bloc };
    `;
    return this.writeFile(blocFilePath, blocData);
  }

  // Method to write default Events template data
  writeEventsData(blocName: string, folder: string): boolean {
    const eventsFilePath = path.join(folder, `${blocName}.events.ts`);
    const eventsData = `
export interface ${blocName}Event {
  type: string;
  payload?: any;
}

export const EventTypes = {
  SET_DATA: 'SET_DATA',
  FETCH_DATA: 'FETCH_DATA',
};
    `;
    return this.writeFile(eventsFilePath, eventsData);
  }

  // Method to write default States template data
  writeStatesData(blocName: string, folder: string): boolean {
    const statesFilePath = path.join(folder, `${blocName}.states.ts`);
    const statesData = `
export interface ${blocName}State {
  data?: any;
  loading: boolean;
  error?: string;
}

export const initialState: ${blocName}State = {
  data: null,
  loading: false,
  error: '',
};
    `;
    return this.writeFile(statesFilePath, statesData);
  }
}

export { BlocFileService };
