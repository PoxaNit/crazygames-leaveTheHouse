# CrazyGames: Leave the House (Base Prototype)

A modular, lightweight **2D Top-Down Web Game Engine** built from scratch using pure JavaScript (ES Modules) and HTML5 Canvas. This repository serves as a highly scalable sandbox environment featuring custom physics, predictive collision algorithms, and state-driven entity workflows.

## 🚀 Key Features Implemented

*   **Predictive 2D Physics Pipeline:** Movement calculations are verified on a future state clone (`{...game_state}`) before being applied to the runtime memory.
*   **Axis-Separated Decoupled Movement:** Prevents edge-locking and diagonal corner clipping. Entities smoothly slide across solid surfaces.
*   **Edge Snap-to-Wall Physics:** Eliminates pixel gaps. Whenever an entity collides with an obstacle or the canvas boundary, the engine automatically snaps its coordinates to the boundary pixel.
*   **Deadzone Bounding Box Targeting:** High-performance, vibration-free AI chasing algorithm that locks onto target centers using integer rounding (`Math.floor`) and velocity-calibrated deadzones.
*   **Event-Driven Lifecycle System:** Core gameplay loop driven by active flags (`game_running`, `game_over`, `game_won`) with an absolute asynchronous restart override triggered by key events.
*   **Universal System Modules:** Utilitarian modules (like `move_entity`) can ingest and process any geometric entity profile seamlessly, removing code repetition for future guards, drones, or projectiles.

---

## 📂 Project Architecture

The workspace strictly isolates business logic, state handling, mathematical systems, and rendering contexts:

```text
src/
├── game_state/
│   ├── game_state.js          # Mutable single-instance runtime state tree (Singleton)
│   └── start_game.js          # Pure blueprint reset / Lifecycle state manager
├── drawers/
│   ├── player_drawer.js       # Context-isolated canvas painter (using save/restore)
│   ├── monster_drawer.js
│   └── obstacles_drawer.js
├── input/
│   └── input_state.js         # Reactive input listener and keyboard buffer map
├── systems/
│   └── movement/
│       └── move_entity.js     # Universal mathematical collision & snapping engine
└── update_state/
    ├── update_state.js        # Main state loop evaluator
    └── modules/
        ├── player.js          # Controller injecting intention vectors (vx, vy)
        ├── monster.js         # Center-seeking AI targeting processor
        └── coins.js           # Slice-based real-time array removal filter
```

---

## 🎮 Game Rules & Loop

1.  **The Objective:** Navigate the screen to clean up all available instances in the item array (`game_state.coins`).
2.  **The Threat:** A center-seeking monster wakes up on cue. If its bounding box intersects with yours, the loop triggers `game_running = false`.
3.  **Victory Condition:** Clear out every single item entity from the array to trigger the victory state.
4.  **Instant Hot Reload:** Hit the `E` key at any game-over or win gate to reset all entities to their pure initial pointers.

## 🛡️ Best Practices Applied
*   **Reference Safety:** Extensive use of the spread operator (`...`) to isolate mutations.
*   **Canvas Isolation:** Wraps individual drawers inside `ctx.save()` and `ctx.restore()` contexts to block style leakage.
*   **Hierarchical Controls:** Input drivers simply manipulate speed variables (`vx`, `vy`) or state triggers, delegating positions strictly to physics supervisors.

