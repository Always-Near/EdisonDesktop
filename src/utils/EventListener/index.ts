type Event = string
type Listener = (...arg: any) => void

export class EventListener {
  listeners: Map<Event, Listener[]>
  constructor() {
    this.listeners = new Map()
  }

  addEventListener = (event: Event, listener: Listener) => {
    const oldList = this.listeners.get(event) || []
    const newList = [...oldList, listener]
    this.listeners.set(event, newList)
  }

  removeEventListener = (event: Event, listener: Listener) => {
    const oldList = this.listeners.get(event) || []
    const newList = oldList.filter(item => item !== listener)
    this.listeners.set(event, newList)
  }

  emitEvent = (event: Event, payload: any) => {
    const listenerList = this.listeners.get(event) || []
    listenerList.forEach(cb => {
      cb(payload)
    })
  }
}
