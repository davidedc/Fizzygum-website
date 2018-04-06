// Generated by CoffeeScript 1.12.7
window.VideoPlayIconAppearance_coffeSource = 'class VideoPlayIconAppearance extends IconAppearance\n\n  constructor: (@morph) ->\n    super\n    @preferredSize = new Point 100, 100\n    @specificationSize = new Point 100, 100\n\n  paintFunction: (context) ->\n    #// Color Declarations\n    white = \'rgb(255, 255, 255)\'\n    red = \'rgb(255, 38, 0)\'\n    #// Group\n    #// background Drawing\n    context.beginPath()\n    context.moveTo 90.5, 0.5\n    context.lineTo 9, 0.5\n    context.lineTo 9, 0.5\n    context.bezierCurveTo 0, 0.5, 0.5, 0, 0.5, 9\n    context.lineTo 0.5, 90.5\n    context.lineTo 0.5, 90.5\n    context.bezierCurveTo 0.5, 100, 0, 99.5, 9, 99.5\n    context.lineTo 90.5, 99.5\n    context.lineTo 90.5, 99.5\n    context.bezierCurveTo 100, 99.5, 99.5, 100, 99.5, 90.5\n    context.lineTo 99.5, 9\n    context.lineTo 99.5, 9\n    context.bezierCurveTo 99.5, 0, 100, 0.5, 90.5, 0.5\n    context.closePath()\n    context.fillStyle = red\n    context.fill()\n    #// white lozange Drawing\n    context.beginPath()\n    context.moveTo 92.5, 32.5\n    context.bezierCurveTo 92.5, 32.5, 91.5, 26.5, 89, 24\n    context.bezierCurveTo 85.5, 21, 82, 20.5, 80, 20.5\n    context.bezierCurveTo 68, 19.5, 50, 19.5, 50, 19.5\n    context.lineTo 50, 19.5\n    context.bezierCurveTo 50, 19.5, 31.5, 19.5, 19.5, 20.5\n    context.bezierCurveTo 18, 20.5, 14, 20.5, 11, 24\n    context.bezierCurveTo 8, 26.5, 7.5, 32.5, 7.5, 32.5\n    context.bezierCurveTo 7.5, 32.5, 6.5, 39.5, 6.5, 46\n    context.lineTo 6.5, 53\n    context.bezierCurveTo 6.5, 59.5, 7.5, 66.5, 7.5, 66.5\n    context.bezierCurveTo 7.5, 66.5, 8, 72.5, 11, 75\n    context.bezierCurveTo 14, 78, 18.5, 78, 20.5, 78.5\n    context.bezierCurveTo 27.5, 79, 50, 79.5, 50, 79.5\n    context.bezierCurveTo 50, 79.5, 68, 79.5, 80, 78.5\n    context.bezierCurveTo 82, 78.5, 85.5, 78.5, 89, 75\n    context.bezierCurveTo 91.5, 72.5, 92.5, 66.5, 92.5, 66.5\n    context.bezierCurveTo 92.5, 66.5, 93.5, 59.5, 93.5, 53\n    context.lineTo 93.5, 46.5\n    context.bezierCurveTo 93.5, 39.5, 92.5, 32.5, 92.5, 32.5\n    context.closePath()\n    context.fillStyle = white\n    context.fill()\n    #// Triangle Drawing\n    context.beginPath()\n    context.moveTo 41, 60.5\n    context.lineTo 64.5, 48.5\n    context.lineTo 41, 36.5\n    context.lineTo 41, 60.5\n    context.closePath()\n    context.fillStyle = red\n    context.fill()\n\n';
