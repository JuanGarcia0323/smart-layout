# React Smart-Layout

React Smart-Layout is a cutting-edge React library designed to effortlessly generate adaptive layouts that fit perfectly into any container. Empower your users by allowing them to swiftly reorganize elements and resize them to their needs.

## 🌟 Features:

- **Adaptive**: Automatically adjusts content to fit any container size.
- **Animated**: Amazing animations for any element on the layout.
- **Movable**: Easy-to-use interface that lets users reposition elements in real-time.
- **Resizable Components**: Dynamically adjust the size of your components with intuitive resizing handles.
- **Highly Performant**: Optimized for peak performance to ensure smooth user interactions, even with a large number of components.
- **Seamless Integration**: Designed from the ground up to be easily integrated into any React project, no matter the size or complexity.

Give your users the ultimate layout experience and elevate your UI with React Smart-Layout! 🌐

## Example:

It's really easy to use you just need to import the `ComponentLayout`
and add your childrens

```typescript
import { ComponentLayout } from "smart-layout";

<ComponentLayout id="starting-layout">
  <div style={{ width: "100%", height: "100%", background: "gray" }} />
  <div style={{ width: "100%", height: "100%", background: "blue" }} />
  <div style={{ width: "100%", height: "100%", background: "orange" }} />
  <div style={{ width: "100%", height: "100%", background: "orange" }} />
  <div style={{ width: "100%", height: "100%", background: "orange" }} />
</ComponentLayout>;
```

### Result:

![Alt Text](ezgif.com-video-to-gif.gif)

### [PLAY WITH IT ON STACKBLITZ](https://stackblitz.com/edit/stackblitz-starters-wo6bmb?file=src%2FApp.tsx)
