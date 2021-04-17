interface Keybinds {
  [key: number]: () => void,
}

export default function useKeyBinds(binds: Keybinds) {
  const handler = (event: any) => {
    const target = (
      event.which ||
      event.keyCode
    )

    Object.entries(binds).forEach(([key, callback]) => {
      if (key.toString() === target.toString()) {
        callback()
      }
    })
  }

  return {
    onKeyDown: handler,
  }
}
