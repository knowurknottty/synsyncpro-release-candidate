# Custom Graphics Components

## Overview

This document describes the custom SVG graphics components created for SynSync Pro. All components are:
- **Fully animated** (respects `reduceMotion` accessibility setting)
- **Scalable** (vector-based, crisp at any size)
- **Themed** (match the app's neuro-aesthetic color palette)
- **Performant** (pure CSS animations, no JavaScript loops)

---

## Components

### 1. VisualizationModePreview

**File:** `components/VisualizationModePreview.tsx`

**Purpose:** Animated preview cards for visualization mode selection UI.

**Usage:**
```tsx
import { VisualizationModePreview } from './components/VisualizationModePreview';

<VisualizationModePreview
    mode="neural"
    size={120}
    animated={true}
/>
```

**Supported Modes:**
- `neural` - Voronoi cells with pulsing connections (amber/orange)
- `cosmic` - Spiraling particles (cyan/blue)
- `oscilloscope` - Classic scope trace with grid (green)
- `spectrum` - Frequency bars with gradient (red-yellow-green)
- `cymatics` - Rippling interference rings (blue/white)
- `fractal` - Branching tree pattern (brown-green gradient)
- `sacred_geometry` - Flower of Life mandala (gold)
- `pulse` - Expanding concentric rings (magenta)
- `waveform`, `hyper`, `symmetry`, `galactic`, `cyber`, `dmt` - Default placeholder

**Integration Example:**
```tsx
// Add to mode selection dropdown
const MODE_OPTIONS = [
    { id: 'neural', label: 'Neural Network', preview: <VisualizationModePreview mode="neural" size={80} /> },
    { id: 'cosmic', label: 'Cosmic Spiral', preview: <VisualizationModePreview mode="cosmic" size={80} /> },
    // ...
];

<select>
    {MODE_OPTIONS.map(opt => (
        <option key={opt.id} value={opt.id}>
            {opt.preview}
            {opt.label}
        </option>
    ))}
</select>
```

---

### 2. PerformanceIndicator

**File:** `components/PerformanceIndicator.tsx`

**Purpose:** Real-time performance monitoring overlay showing FPS, frame time, and renderer info.

**Usage:**
```tsx
import { PerformanceIndicator, PerformanceIndicatorToggle } from './components/PerformanceIndicator';

// In your visualizer component
const [perfMetrics, setPerfMetrics] = useState<PerformanceMetrics | null>(null);
const [showPerf, setShowPerf] = useState(false);

<VisualizerOptimized
    onPerformanceMetrics={setPerfMetrics}
    {...otherProps}
/>

{showPerf && <PerformanceIndicator metrics={perfMetrics} onClose={() => setShowPerf(false)} />}

<PerformanceIndicatorToggle visible={showPerf} onToggle={() => setShowPerf(!showPerf)} />
```

**Features:**
- Color-coded FPS badge (green >50, yellow 30-50, red <30)
- Real-time frame time graph (last 60 frames)
- Renderer type indicator (WebGL/Canvas2D/Cymatics)
- Minimizable with localStorage persistence
- Quality status text

**Integration with VisualizerOptimized:**
```tsx
// VisualizerOptimized.tsx already supports onPerformanceMetrics callback
// Just connect it to the PerformanceIndicator component

interface Props {
    onPerformanceMetrics?: (metrics: PerformanceMetrics) => void;
    // ...
}

// Inside RAF loop
if (frameCount % 60 === 0 && props.onPerformanceMetrics) {
    props.onPerformanceMetrics({
        fps: Math.round(1000 / avgFrameTime),
        frameTime: avgFrameTime,
        mode: currentMode,
        renderer: 'webgl'
    });
}
```

---

### 3. ProtocolCategoryIcons

**File:** `components/ProtocolCategoryIcons.tsx`

**Purpose:** Custom animated icons for protocol categories (more visually descriptive than Material Symbols).

**Available Icons:**
- `NeuralRewiringIcon` - Synapse connections with pulsing nodes (purple)
- `SleepRecoveryIcon` - Crescent moon with twinkling stars (indigo)
- `ConsciousnessExpansionIcon` - Rotating mandala petals (purple)
- `AutonomicMasteryIcon` - ECG heartbeat waveform (red)
- `FlowStateIcon` - Flowing wave curves (lime green)
- `GammaFocusIcon` - Lightning bolt with energy particles (yellow/orange)
- `CymaticsIcon` - Concentric rippling rings (cyan)

**Usage:**
```tsx
import {
    NeuralRewiringIcon,
    SleepRecoveryIcon,
    ConsciousnessExpansionIcon
} from './components/ProtocolCategoryIcons';

// In protocol cards or category headers
<NeuralRewiringIcon size={48} className="text-purple-400" />
<SleepRecoveryIcon size={32} />
<ConsciousnessExpansionIcon size={64} className="opacity-80" />
```

**Integration with ProtocolGallery:**
```tsx
// Replace Material Symbols icons with custom icons for specific categories
const getCategoryIcon = (section: string) => {
    const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
        'Neural Rewiring': NeuralRewiringIcon,
        'Sleep & Recovery': SleepRecoveryIcon,
        'Consciousness Expansion': ConsciousnessExpansionIcon,
        'Autonomic Mastery': AutonomicMasteryIcon,
        'Flow State': FlowStateIcon,
        'Performance Advanced': GammaFocusIcon,
    };
    return iconMap[section];
};

// Then use in render
const CustomIcon = getCategoryIcon(protocol.section);
{CustomIcon && <CustomIcon size={64} />}
```

---

## Design System Colors

All graphics use colors from the existing palette:

| Component | Primary Color | Accent Color | Purpose |
|-----------|--------------|--------------|---------|
| Neural | `#ff8a00` (amber) | `#ff4400` (red-orange) | Matches FS_NEURAL shader |
| Cosmic | `#00ffff` (cyan) | `#0088ff` (blue) | Matches FS_COSMIC shader |
| Oscilloscope | `#00ff00` (green) | - | Classic scope aesthetic |
| Spectrum | `#ff0000` → `#00ff00` | - | Frequency gradient |
| Cymatics | `#00aaff` (blue) | `#ffffff` (white) | Water/wave theme |
| Sleep | `#818cf8` (indigo) | `#6366f1` (purple) | Night mode colors |
| Flow | `#a3e635` (lime) | - | Organic movement |
| Gamma | `#fbbf24` (yellow) | `#f97316` (orange) | Energy/focus |

---

## Animation Guidelines

All animations follow these rules:

1. **Respect `reduceMotion`**
   - Always import `useMotion()` hook
   - Disable animations when `reduceMotion === true`
   - Example:
     ```tsx
     const { reduceMotion } = useMotion();
     const shouldAnimate = animated && !reduceMotion;
     ```

2. **Performance**
   - Use CSS animations (not JavaScript RAF loops)
   - Animate `opacity`, `transform` only (GPU-accelerated)
   - Avoid animating `width`, `height`, `background-color` (CPU-bound)

3. **Timing**
   - Subtle pulses: 2-3 seconds
   - Rotations: 8-10 seconds
   - Fast effects: 0.5-1 second

4. **Easing**
   - `ease-in-out` for loops
   - `ease-out` for one-shot effects
   - `linear` for continuous rotations

---

## File Sizes

All components are lightweight:
- **VisualizationModePreview.tsx**: ~12KB (300 lines)
- **PerformanceIndicator.tsx**: ~10KB (280 lines)
- **ProtocolCategoryIcons.tsx**: ~10KB (320 lines)

Total: ~32KB (0.032MB) - negligible bundle impact.

---

## Testing Checklist

- [ ] All animations respect `reduceMotion` setting
- [ ] Icons render correctly at 16px, 32px, 64px sizes
- [ ] Performance overlay updates in real-time
- [ ] Frame time graph renders correctly
- [ ] Preview components show distinct visuals for each mode
- [ ] No console errors or warnings
- [ ] Animations are smooth (60fps)
- [ ] Works in Chrome, Firefox, Safari

---

## Future Enhancements

### Phase 1: Protocol Category Integration
- Replace generic Material Symbols in ProtocolGallery with custom icons
- Add animated category headers
- Create icon selector for custom protocol builder

### Phase 2: Visualization Mode Selector UI
- Build dropdown/grid with animated previews
- Add hover tooltips describing each mode
- Integrate with Visualizer component

### Phase 3: Advanced Performance Metrics
- GPU memory usage (via WebGL extension)
- Shader compile time tracking
- Audio latency monitoring
- Battery usage estimation

---

## Questions & Support

**Q: Can I create new custom icons?**
A: Yes! Follow the pattern in `ProtocolCategoryIcons.tsx`. Use:
- 24x24 viewBox
- `useMotion()` hook for accessibility
- Color palette from design system
- CSS animations (not JavaScript)

**Q: How do I add a new visualization preview?**
A: Add a new case in `VisualizationModePreview.tsx` with an SVG pattern. Match the colors and aesthetic of the actual shader for consistency.

**Q: Performance indicator not updating?**
A: Ensure `VisualizerOptimized` is passing metrics via `onPerformanceMetrics` callback every 60 frames (see implementation in RAF loop).

---

## Summary

✅ **3 new graphics components** created
✅ **14 custom animated icons** for categories and modes
✅ **Full accessibility support** (reduceMotion)
✅ **Performance monitoring** with real-time graphs
✅ **Zero dependencies** (pure SVG + CSS)
✅ **Tiny bundle impact** (32KB total)

**Ready for integration with ProtocolGallery, Visualizer, and Settings UI.**
