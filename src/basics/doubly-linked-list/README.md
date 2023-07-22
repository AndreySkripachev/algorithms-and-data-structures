# Doubly-linked list

## What is it?

A doubly linked list is a data structure similar to a regular linked list. If anything, here's a link to the [linked list](../linked-list).

But the double linked list has one peculiarity. It gives us the ability to move freely through the list by introducing a link not only to the next but also to the previous node of the list (it's almost a [Turing machine](https://en.wikipedia.org/wiki/Turing_machine))

In general, the interface of the list looks like this:

```typescript
interface DoublyLinkedList {

  /** The value of the node. */
  value: any;

  /** Reference to the next node. */
  next?: DoublyLinkedList;

  /** Reference to the previous node. */
  previous?: DoublyLinkedList;
}
```

And also in graphic form:

```plain
  Value of the list node
  |
  |    Link to the next node.
  |    |
  |    |   Link to the previous node
  |    |         |
  |    |   ∅     |
  ↓    ↓   ↑     |
——————————————   |
| 62 | ● | ● | ←-┚
——————————————
       ↓   ↑
——————————————
| 54 | ● | ● |  // 2-nd element.
——————————————
       ↓   ↑
——————————————
| 11 | ● | ● |  // 3-rd element.
——————————————
       ↓
       ∅    // End of list.

```

## Basic principles of working with the list

I think there is no point in explaining list operations now, since the principle is no different from working with ordinary linked lists. But you need to be careful and keep the links intact.
