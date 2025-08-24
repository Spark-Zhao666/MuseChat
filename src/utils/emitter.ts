import mitt from 'mitt'
type Events = {
    action: {
        type: string;
        value: any;
    }
};
const emitter = mitt<Events>();
export default emitter;