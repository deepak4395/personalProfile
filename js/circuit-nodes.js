// ===========================
// Circuit Node Connections for Skills Section
// ===========================

class CircuitNodeConnections {
    constructor() {
        this.canvas = document.getElementById('skills-connections');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.activeNode = null;
        this.connections = [];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.collectNodes();
        this.attachEventListeners();
        this.addStyles();
        
        // Initial draw
        this.draw();
        
        // Redraw on resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.collectNodes();
            this.draw();
        });
    }
    
    setupCanvas() {
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    collectNodes() {
        this.nodes = [];
        const skillNodes = document.querySelectorAll('.skill-node');
        const canvasRect = this.canvas.getBoundingClientRect();
        
        skillNodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            this.nodes.push({
                element: node,
                x: rect.left - canvasRect.left + rect.width / 2,
                y: rect.top - canvasRect.top + rect.height / 2,
                id: node.getAttribute('data-node'),
                related: (node.getAttribute('data-related') || '').split(',')
            });
        });
    }
    
    attachEventListeners() {
        document.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                this.activeNode = node.getAttribute('data-node');
                node.classList.add('active-node');
                
                // Highlight related nodes
                const related = (node.getAttribute('data-related') || '').split(',');
                related.forEach(rel => {
                    const relNode = document.querySelector(`[data-node="${rel}"]`);
                    if (relNode) {
                        relNode.classList.add('related-node');
                    }
                });
                
                this.draw();
            });
            
            node.addEventListener('mouseleave', () => {
                this.activeNode = null;
                document.querySelectorAll('.skill-node').forEach(n => {
                    n.classList.remove('active-node', 'related-node');
                });
                this.draw();
            });
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.activeNode) return;
        
        // Find active node data
        const activeNodeData = this.nodes.find(n => n.id === this.activeNode);
        if (!activeNodeData) return;
        
        // Draw connections to related nodes
        activeNodeData.related.forEach(relatedId => {
            const relatedNode = this.nodes.find(n => n.id === relatedId);
            if (relatedNode) {
                this.drawConnection(activeNodeData, relatedNode);
            }
        });
        
        // Draw nodes
        this.drawNode(activeNodeData, true);
        activeNodeData.related.forEach(relatedId => {
            const relatedNode = this.nodes.find(n => n.id === relatedId);
            if (relatedNode) {
                this.drawNode(relatedNode, false);
            }
        });
    }
    
    drawConnection(from, to) {
        const gradient = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
        gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.4)');
        gradient.addColorStop(1, 'rgba(239, 68, 68, 0.8)');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 2;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        
        this.ctx.beginPath();
        this.ctx.moveTo(from.x, from.y);
        
        // Draw bezier curve for more organic look
        const cpX = (from.x + to.x) / 2;
        const cpY = (from.y + to.y) / 2 - 50;
        this.ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);
        
        this.ctx.stroke();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
    }
    
    drawNode(nodeData, isActive) {
        const radius = isActive ? 6 : 4;
        
        this.ctx.fillStyle = isActive ? '#ef4444' : 'rgba(239, 68, 68, 0.6)';
        this.ctx.shadowBlur = isActive ? 15 : 8;
        this.ctx.shadowColor = '#ef4444';
        
        this.ctx.beginPath();
        this.ctx.arc(nodeData.x, nodeData.y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner glow
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        this.ctx.arc(nodeData.x, nodeData.y, radius / 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
    }
    
    addStyles() {
        if (document.getElementById('circuit-nodes-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'circuit-nodes-styles';
        style.textContent = `
            .circuit-nodes-container {
                position: relative;
                min-height: 500px;
            }
            
            .skills-canvas {
                position: absolute;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 1;
            }
            
            .skills-grid {
                position: relative;
                z-index: 2;
            }
            
            .skill-node {
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .skill-node::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 8px;
                height: 8px;
                background: rgba(239, 68, 68, 0.3);
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .skill-node.active-node {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                box-shadow: 
                    0 0 20px rgba(239, 68, 68, 0.6),
                    0 0 40px rgba(239, 68, 68, 0.3),
                    inset 0 0 10px rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
                z-index: 10;
            }
            
            .skill-node.active-node::before {
                opacity: 1;
                animation: nodePulse 1s ease-in-out infinite;
            }
            
            .skill-node.related-node {
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.7), rgba(220, 38, 38, 0.7));
                box-shadow: 
                    0 0 15px rgba(239, 68, 68, 0.4),
                    0 0 30px rgba(239, 68, 68, 0.2);
                transform: scale(1.05);
            }
            
            .skill-node.related-node::before {
                opacity: 1;
            }
            
            @keyframes nodePulse {
                0%, 100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 0.8;
                }
                50% {
                    transform: translate(-50%, -50%) scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('skills-connections')) {
            new CircuitNodeConnections();
        }
    });
} else {
    if (document.getElementById('skills-connections')) {
        new CircuitNodeConnections();
    }
}
