import bellMP3 from '../asserts/media/bell.mp3';
import unlockedMP3 from '../asserts/media/unlocked.mp3';
const bell = new window.Audio(bellMP3);
const unlocked = new window.Audio(unlockedMP3);
class MessageBox {
    messages = [];
    playSounds = null;

    addMessage(message, audio=false, require='alter-success') {
        this.messages.push([message, require]);
        if (this.playSounds && this.playSounds.getValue()) {
            if (audio === 'bell') {
                bell.volume = 0.5;
                bell.play();
            }
            else if (audio === 'unlocked') {
                unlocked.volume = 0.5;
                unlocked.play();
            }
        }
        while (this.messages.length > 5) {
            this.messages.shift();
        }
    }
    oldestMessage() {
        return this.messages.length > 0 ? this.messages[0] : '';
    }
    newestMessage() {
        return this.messages.length > 0 ? this.messages[this.messages.length - 1] : '';
    }
}
export let messageBox = new MessageBox();
