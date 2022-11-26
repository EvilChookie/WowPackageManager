import chalk, { ForegroundColorName } from 'npm:chalk@5';

class log {
    write(glyph: string, colour: ForegroundColorName, ...messages: string[]) {
        messages.forEach((message, index) => {
            if (index == 0) {
                console.log(chalk[colour](`${glyph} ${message}`));
            } else {
                console.log(chalk[colour](`  ${message}`));
            }
        });
    }

    info(...messages: string[]) {
        this.write('●', 'blue', ...messages);
    }

    success(...messages: string[]) {
        this.write('✓', 'green', ...messages);
    }

    warn(...messages: string[]) {
        this.write('!', 'yellow', ...messages);
    }

    error(...messages: string[]) {
        this.write('✗', 'red', ...messages);
    }

    config(key: string, value: string) {
        this.write('→', 'cyan', `${key}: ${value}`);
    }
}

export default new log();
