// ===========================
// Binary/Hex Code Rain Effect
// ===========================

class MatrixRain {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        // Styling
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Embedded system hex values and binary
        this.characters = '01×÷≠≈∞∫∂√πΩμ0xFF0x000xAB0xCD0x12';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        // Semi-transparent black to create fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Red text with glow
        this.ctx.fillStyle = '#ef4444';
        this.ctx.font = this.fontSize + 'px monospace';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            // Reset drop randomly or when it reaches bottom
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===========================
// Particle System
// ===========================

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        // Styling
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.particles = [];
        this.particleCount = 60;
        this.connectionDistance = 150;
        
        this.init();
        this.animate();
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                type: Math.random() > 0.7 ? 'chip' : 'node'
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        
        if (particle.type === 'chip') {
            // Draw microchip icon
            this.ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            this.ctx.fillRect(particle.x - 3, particle.y - 3, 6, 6);
            this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(particle.x - 4, particle.y - 4, 8, 8);
            
            // Draw chip pins
            this.ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
            for (let i = -1; i <= 1; i += 2) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x - 4 * i, particle.y - 2);
                this.ctx.lineTo(particle.x - 6 * i, particle.y - 2);
                this.ctx.moveTo(particle.x - 4 * i, particle.y + 2);
                this.ctx.lineTo(particle.x - 6 * i, particle.y + 2);
                this.ctx.stroke();
            }
        } else {
            // Draw glowing node
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
            this.ctx.fill();
        }
        
        this.ctx.shadowBlur = 0;
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    update() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawConnections();
        
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
        
        this.update();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===========================
// PCB Trace Animation
// ===========================

class PCBTraces {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.style.position = 'absolute';
        this.svg.style.top = '0';
        this.svg.style.left = '0';
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';
        this.svg.style.pointerEvents = 'none';
        this.svg.style.zIndex = '0';
        this.svg.style.opacity = '0.3';
        
        this.container.appendChild(this.svg);
        
        this.createTraces();
    }
    
    createTraces() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        // Create random PCB-like traces
        const traceCount = 8;
        
        for (let i = 0; i < traceCount; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            // Create zigzag path
            let d = `M ${Math.random() * width} ${Math.random() * height}`;
            const segments = 5 + Math.floor(Math.random() * 5);
            
            for (let j = 0; j < segments; j++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                
                if (Math.random() > 0.5) {
                    d += ` L ${x} ${y}`;
                } else {
                    const cx = Math.random() * width;
                    const cy = Math.random() * height;
                    d += ` Q ${cx} ${cy} ${x} ${y}`;
                }
            }
            
            path.setAttribute('d', d);
            path.setAttribute('stroke', '#ef4444');
            path.setAttribute('stroke-width', '1');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.15');
            
            // Animate stroke dashoffset
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = `traceDraw ${10 + Math.random() * 10}s linear infinite`;
            
            this.svg.appendChild(path);
            
            // Add via points (connection points)
            const viaCount = 3;
            for (let v = 0; v < viaCount; v++) {
                const point = path.getPointAtLength(Math.random() * length);
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', point.x);
                circle.setAttribute('cy', point.y);
                circle.setAttribute('r', '3');
                circle.setAttribute('fill', '#ef4444');
                circle.setAttribute('opacity', '0.4');
                
                // Pulsing animation
                circle.style.animation = `viaPulse ${2 + Math.random() * 2}s ease-in-out infinite`;
                circle.style.animationDelay = `${Math.random() * 2}s`;
                
                this.svg.appendChild(circle);
            }
        }
        
        // Add CSS animations to document if not already present
        if (!document.getElementById('pcb-animations')) {
            const style = document.createElement('style');
            style.id = 'pcb-animations';
            style.textContent = `
                @keyframes traceDraw {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                
                @keyframes viaPulse {
                    0%, 100% {
                        opacity: 0.2;
                        r: 3;
                    }
                    50% {
                        opacity: 0.6;
                        r: 4;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===========================
// Initialize on page load
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain in hero section
    new MatrixRain('hero');
    
    // Initialize Particle System
    new ParticleSystem('hero');
    
    // Initialize PCB Traces
    new PCBTraces('hero');
    
    // Initialize Typing Effect
    new TypingEffect('hero-subtitle', [
        'Embedded Systems Engineer',
        'IoT Solutions Architect',
        'Firmware Developer',
        'Hardware Designer',
        'RTOS Specialist'
    ]);
    
    // Initialize Embedded Terminal
    new EmbeddedTerminal();
    
    // Initialize Oscilloscope Waveforms
    document.querySelectorAll('.waveform-divider').forEach(divider => {
        new OscilloscopeWaveform(divider);
    });
    
    // Initialize LED Indicators
    document.querySelectorAll('.led-indicator').forEach(led => {
        new LEDIndicator(led);
    });
    
    // Initialize Circuit Node Connections for Skills
    if (document.getElementById('skills-connections')) {
        new CircuitNodeConnections();
    }
});

// ===========================
// Hexagonal LED Border
// ===========================

class HexagonalLEDBorder {
    constructor(containerId) {
        this.container = document.querySelector('.' + containerId);
        if (!this.container) return;
        
        this.createHexagon();
    }
    
    createHexagon() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'hexagon-border');
        svg.setAttribute('viewBox', '0 0 200 200');
        
        // Hexagon path
        const hexPath = 'M 100,10 L 173.2,50 L 173.2,150 L 100,190 L 26.8,150 L 26.8,50 Z';
        
        // Create multiple layers for LED effect
        for (let i = 0; i < 3; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', hexPath);
            path.setAttribute('class', `hex-layer hex-layer-${i}`);
            svg.appendChild(path);
        }
        
        // Add LED segments (6 sides)
        const ledCount = 6;
        for (let i = 0; i < ledCount; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const angle = (i * 60 - 90) * Math.PI / 180;
            const radius = 85;
            const cx = 100 + radius * Math.cos(angle);
            const cy = 100 + radius * Math.sin(angle);
            
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', '4');
            circle.setAttribute('class', 'led-dot');
            circle.style.animationDelay = `${i * 0.15}s`;
            
            svg.appendChild(circle);
        }
        
        this.container.appendChild(svg);
        
        // Add CSS if not already present
        if (!document.getElementById('hexagon-styles')) {
            const style = document.createElement('style');
            style.id = 'hexagon-styles';
            style.textContent = `
                .hexagon-border {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                    pointer-events: none;
                }
                
                .hex-layer {
                    fill: none;
                    stroke: #ef4444;
                    stroke-width: 2;
                    opacity: 0.6;
                    filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.6));
                }
                
                .hex-layer-0 {
                    animation: hexPulse 3s ease-in-out infinite;
                }
                
                .hex-layer-1 {
                    stroke-width: 1;
                    opacity: 0.4;
                    animation: hexPulse 3s ease-in-out infinite 0.5s;
                }
                
                .hex-layer-2 {
                    stroke-width: 3;
                    opacity: 0.2;
                    animation: hexPulse 3s ease-in-out infinite 1s;
                }
                
                .led-dot {
                    fill: #ef4444;
                    filter: drop-shadow(0 0 4px #ef4444) drop-shadow(0 0 8px #ef4444);
                    animation: ledBlink 1.5s ease-in-out infinite;
                }
                
                @keyframes hexPulse {
                    0%, 100% {
                        stroke-width: 2;
                        opacity: 0.6;
                    }
                    50% {
                        stroke-width: 3;
                        opacity: 1;
                    }
                }
                
                @keyframes ledBlink {
                    0%, 100% {
                        opacity: 0.4;
                        r: 3;
                    }
                    50% {
                        opacity: 1;
                        r: 5;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===========================
// Embedded Terminal Simulation
// ===========================

class EmbeddedTerminal {
    constructor() {
        this.isMinimized = false;
        this.createTerminal();
        this.bootSequence();
        this.attachButtonHandlers();
    }
    
    createTerminal() {
        // Create terminal container
        this.terminal = document.createElement('div');
        this.terminal.className = 'embedded-terminal';
        this.terminal.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="terminal-btn terminal-close"></span>
                    <span class="terminal-btn terminal-minimize"></span>
                    <span class="terminal-btn terminal-maximize"></span>
                </div>
                <div class="terminal-title">Embedded System Console</div>
            </div>
            <div class="terminal-body">
                <div class="terminal-output" id="terminal-output"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">$</span>
                    <input type="text" class="terminal-input" id="terminal-input" placeholder="Type 'help' for commands..." />
                </div>
            </div>
        `;
        
        document.body.appendChild(this.terminal);
        
        // Add event listener for commands
        const input = document.getElementById('terminal-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value);
                input.value = '';
            }
        });
        
        this.addStyles();
    }
    
    attachButtonHandlers() {
        const minimizeBtn = this.terminal.querySelector('.terminal-minimize');
        const closeBtn = this.terminal.querySelector('.terminal-close');
        
        minimizeBtn.addEventListener('click', () => {
            this.toggleMinimize();
        });
        
        closeBtn.addEventListener('click', () => {
            this.terminal.style.display = 'none';
        });
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        const terminalBody = this.terminal.querySelector('.terminal-body');
        
        if (this.isMinimized) {
            this.terminal.classList.add('minimized');
            terminalBody.style.display = 'none';
        } else {
            this.terminal.classList.remove('minimized');
            terminalBody.style.display = 'block';
        }
    }
    
    addStyles() {
        // Add CSS
        if (!document.getElementById('terminal-styles')) {
            const style = document.createElement('style');
            style.id = 'terminal-styles';
            style.textContent = `
                .embedded-terminal {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 450px;
                    max-width: 90vw;
                    background: rgba(10, 10, 10, 0.95);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px rgba(239, 68, 68, 0.2);
                    font-family: 'Courier New', monospace;
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    animation: terminalSlideIn 0.5s ease-out;
                }
                
                @keyframes terminalSlideIn {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .terminal-header {
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    background: rgba(239, 68, 68, 0.1);
                    border-bottom: 1px solid rgba(239, 68, 68, 0.2);
                    border-radius: 8px 8px 0 0;
                }
                
                .terminal-buttons {
                    display: flex;
                    gap: 6px;
                }
                
                .terminal-btn {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                
                .terminal-btn:hover {
                    transform: scale(1.2);
                }
                
                .terminal-btn:active {
                    transform: scale(0.95);
                }
                
                .terminal-close { 
                    background: #ef4444; 
                }
                
                .terminal-close:hover {
                    box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
                }
                
                .terminal-minimize { 
                    background: #f59e0b; 
                }
                
                .terminal-minimize:hover {
                    box-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
                }
                
                .terminal-maximize { 
                    background: #10b981; 
                }
                
                .terminal-maximize:hover {
                    box-shadow: 0 0 8px rgba(16, 185, 129, 0.8);
                }
                
                .terminal-title {
                    flex: 1;
                    text-align: center;
                    color: #ef4444;
                    font-size: 12px;
                    font-weight: bold;
                }
                
                .terminal-body {
                    padding: 12px;
                    max-height: 300px;
                    overflow-y: auto;
                }
                
                .terminal-output {
                    color: #10b981;
                    font-size: 12px;
                    line-height: 1.6;
                    margin-bottom: 8px;
                }
                
                .terminal-line {
                    margin: 4px 0;
                    animation: terminalFadeIn 0.3s ease-out;
                }
                
                @keyframes terminalFadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .terminal-error {
                    color: #ef4444;
                }
                
                .terminal-warning {
                    color: #f59e0b;
                }
                
                .terminal-input-line {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .terminal-prompt {
                    color: #ef4444;
                    font-weight: bold;
                }
                
                .terminal-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #10b981;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    outline: none;
                }
                
                .terminal-input::placeholder {
                    color: rgba(16, 185, 129, 0.4);
                }
                
                .terminal-cursor {
                    display: inline-block;
                    width: 8px;
                    height: 14px;
                    background: #10b981;
                    animation: blink 1s step-end infinite;
                }
                
                .embedded-terminal.minimized {
                    width: 300px;
                    transition: all 0.3s ease;
                }
                
                .embedded-terminal.minimized .terminal-body {
                    display: none;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    bootSequence() {
        const output = document.getElementById('terminal-output');
        const messages = [
            { text: 'Initializing embedded system...', delay: 0 },
            { text: 'Loading firmware v2.1.0', delay: 500 },
            { text: 'Mounting /skills partition... [OK]', delay: 1000 },
            { text: 'Starting IoT services... [OK]', delay: 1500 },
            { text: 'Loading development environment... [OK]', delay: 2000 },
            { text: 'System ready. Type "help" for available commands.', delay: 2500, class: 'terminal-warning' }
        ];
        
        messages.forEach(msg => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = 'terminal-line' + (msg.class ? ' ' + msg.class : '');
                line.textContent = '> ' + msg.text;
                output.appendChild(line);
                output.scrollTop = output.scrollHeight;
            }, msg.delay);
        });
    }
    
    executeCommand(cmd) {
        const output = document.getElementById('terminal-output');
        const command = cmd.trim().toLowerCase();
        
        // Echo command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span class="terminal-prompt">$</span> ${cmd}`;
        output.appendChild(cmdLine);
        
        // Execute
        let response = '';
        let responseClass = '';
        
        switch(command) {
            case 'help':
                response = `Available commands:
  - status    : Show system status
  - skills    : List technical skills
  - projects  : Show featured projects
  - contact   : Display contact information
  - clear     : Clear terminal
  - about     : About Deepak Singhal`;
                break;
            case 'status':
                response = `System Status: ONLINE
Uptime: ${Math.floor(Math.random() * 1000)} days
Memory: 85% available
CPU: ARM Cortex-M4 @ 180MHz
Mode: Development`;
                break;
            case 'skills':
                response = `Core Competencies:
  • Embedded C/C++ | Python | RTOS
  • IoT Protocols: MQTT, BLE, Wi-Fi
  • Microcontrollers: STM32, ESP32
  • Tools: Git, Docker, Jenkins`;
                break;
            case 'projects':
                response = `Featured Projects:
  1. IEEE 11073 SDC Medical Device System
  2. BMS CAN Logger & Diagnostics
  3. Secure OTA Update Framework`;
                break;
            case 'contact':
                response = `Contact Information:
  Email: deepaksinghal1995@gmail.com
  Phone: (+91) 9899845428
  Location: New Delhi, India
  GitHub: github.com/deepaksinghal`;
                break;
            case 'about':
                response = `Deepak Singhal
Embedded Systems Architect with 7+ years of experience in IoT, firmware development, and hardware design. Passionate about building innovative embedded solutions.`;
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            default:
                response = `Command not found: ${cmd}
Type 'help' for available commands.`;
                responseClass = 'terminal-error';
        }
        
        const responseLine = document.createElement('div');
        responseLine.className = 'terminal-line ' + responseClass;
        responseLine.style.whiteSpace = 'pre-line';
        responseLine.textContent = response;
        output.appendChild(responseLine);
        output.scrollTop = output.scrollHeight;
    }
}

// ===========================
// Typing Effect
// ===========================

class TypingEffect {
    constructor(elementId, phrases) {
        this.element = document.getElementById(elementId);
        if (!this.element) return;
        
        this.phrases = phrases;
        this.currentPhraseIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseDuration = 2000;
        
        // Create cursor element
        this.cursor = document.createElement('span');
        this.cursor.className = 'typing-cursor';
        this.cursor.textContent = '|';
        this.element.appendChild(this.cursor);
        
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            this.currentText = currentPhrase.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = currentPhrase.substring(0, this.currentText.length + 1);
        }
        
        this.element.childNodes[0].textContent = this.currentText;
        
        let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        
        if (!this.isDeleting && this.currentText === currentPhrase) {
            delay = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            delay = 500;
        }
        
        setTimeout(() => this.type(), delay);
    }
}

// ===========================
// Oscilloscope Waveform Divider
// ===========================

class OscilloscopeWaveform {
    constructor(container) {
        this.container = container;
        this.waveType = container.getAttribute('data-wave-type') || 'sine';
        this.createWaveform();
    }
    
    createWaveform() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'waveform-svg');
        svg.setAttribute('viewBox', '0 0 1200 60');
        svg.setAttribute('preserveAspectRatio', 'none');
        
        // Create animated path based on wave type
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'waveform-path');
        path.setAttribute('d', this.getWavePath());
        
        // Add glow effect with multiple layers
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', `glow-${Math.random().toString(36).substr(2, 9)}`);
        
        const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', '2');
        feGaussianBlur.setAttribute('result', 'coloredBlur');
        
        const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
        const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');
        
        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feMerge);
        defs.appendChild(filter);
        
        svg.appendChild(defs);
        svg.appendChild(path);
        this.container.appendChild(svg);
        
        // Animate the waveform
        this.animateWave(path);
        
        // Add CSS if not already present
        if (!document.getElementById('waveform-styles')) {
            const style = document.createElement('style');
            style.id = 'waveform-styles';
            style.textContent = `
                .waveform-divider {
                    width: 100%;
                    height: 60px;
                    overflow: hidden;
                    position: relative;
                    background: linear-gradient(to bottom, transparent, rgba(239, 68, 68, 0.05), transparent);
                }
                
                .waveform-svg {
                    width: 100%;
                    height: 100%;
                }
                
                .waveform-path {
                    fill: none;
                    stroke: #ef4444;
                    stroke-width: 2;
                    opacity: 0.8;
                    filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6));
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    getWavePath() {
        const width = 1200;
        const height = 60;
        const centerY = height / 2;
        const amplitude = 15;
        
        switch(this.waveType) {
            case 'sine':
                let sinePath = `M 0,${centerY}`;
                for (let x = 0; x <= width; x += 5) {
                    const y = centerY + amplitude * Math.sin(x * 0.02);
                    sinePath += ` L ${x},${y}`;
                }
                return sinePath;
                
            case 'square':
                let squarePath = `M 0,${centerY}`;
                const squarePeriod = 80;
                for (let x = 0; x <= width; x += squarePeriod) {
                    squarePath += ` L ${x},${centerY - amplitude}`;
                    squarePath += ` L ${x + squarePeriod/2},${centerY - amplitude}`;
                    squarePath += ` L ${x + squarePeriod/2},${centerY + amplitude}`;
                    squarePath += ` L ${x + squarePeriod},${centerY + amplitude}`;
                }
                return squarePath;
                
            case 'pulse':
                let pulsePath = `M 0,${centerY}`;
                const pulsePeriod = 100;
                const pulseWidth = 10;
                for (let x = 0; x <= width; x += pulsePeriod) {
                    pulsePath += ` L ${x},${centerY}`;
                    pulsePath += ` L ${x},${centerY - amplitude}`;
                    pulsePath += ` L ${x + pulseWidth},${centerY - amplitude}`;
                    pulsePath += ` L ${x + pulseWidth},${centerY}`;
                }
                return pulsePath;
                
            default:
                return `M 0,${centerY} L ${width},${centerY}`;
        }
    }
    
    animateWave(path) {
        let phase = 0;
        const animate = () => {
            phase += 0.05;
            const width = 1200;
            const height = 60;
            const centerY = height / 2;
            const amplitude = 15;
            
            if (this.waveType === 'sine') {
                let sinePath = `M 0,${centerY}`;
                for (let x = 0; x <= width; x += 5) {
                    const y = centerY + amplitude * Math.sin(x * 0.02 + phase);
                    sinePath += ` L ${x},${y}`;
                }
                path.setAttribute('d', sinePath);
            }
            
            requestAnimationFrame(animate);
        };
        
        if (this.waveType === 'sine') {
            animate();
        }
    }
}

// ===========================
// LED Status Indicators
// ===========================

class LEDIndicator {
    constructor(container) {
        this.container = container;
        this.pattern = container.getAttribute('data-pattern') || 'slow-pulse';
        this.createLED();
    }
    
    createLED() {
        // Create LED dot
        const led = document.createElement('div');
        led.className = `led-status led-${this.pattern}`;
        this.container.appendChild(led);
        
        // Add CSS if not already present
        if (!document.getElementById('led-indicator-styles')) {
            const style = document.createElement('style');
            style.id = 'led-indicator-styles';
            style.textContent = `
                .led-indicator {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    z-index: 10;
                }
                
                .led-status {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #ef4444;
                    box-shadow: 
                        0 0 5px #ef4444,
                        0 0 10px #ef4444,
                        0 0 15px #ef4444,
                        inset 0 0 5px rgba(255, 255, 255, 0.3);
                    position: relative;
                }
                
                .led-status::before {
                    content: '';
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.8);
                }
                
                .led-slow-pulse {
                    animation: ledSlowPulse 2s ease-in-out infinite;
                }
                
                .led-fast-blink {
                    animation: ledFastBlink 0.5s step-end infinite;
                }
                
                .led-fade {
                    animation: ledFade 3s ease-in-out infinite;
                }
                
                @keyframes ledSlowPulse {
                    0%, 100% {
                        opacity: 0.3;
                        box-shadow: 
                            0 0 3px #ef4444,
                            0 0 6px #ef4444;
                    }
                    50% {
                        opacity: 1;
                        box-shadow: 
                            0 0 8px #ef4444,
                            0 0 16px #ef4444,
                            0 0 24px #ef4444;
                    }
                }
                
                @keyframes ledFastBlink {
                    0%, 49% {
                        opacity: 1;
                    }
                    50%, 100% {
                        opacity: 0.2;
                    }
                }
                
                @keyframes ledFade {
                    0% {
                        opacity: 0.2;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0.2;
                    }
                }
                
                @media (max-width: 768px) {
                    .led-indicator {
                        top: 10px;
                        right: 10px;
                    }
                    
                    .led-status {
                        width: 8px;
                        height: 8px;
                    }
                    
                    .led-status::before {
                        top: 1px;
                        left: 1px;
                        width: 3px;
                        height: 3px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

