var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height;

		/* アニメーション用の変数 */
		var frameCount = 0;

		/* アニメーションの画像 */
		var block1 = document.getElementById("block1");
		var characterImage1 = document.getElementsByClassName("character1");
		var thinkingEffect = document.getElementsByClassName("thinkingEffect");

		/* キャラのインスタンス化 */
		var character1 = new Character1;

		/* animation frame */
		var rAF = window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.requestAnimationFrame;

		/* アニメーションの配列 */
		/* 歩くアニメーション作成 */
		var moveAnimation1 = new Array(characterImage1[0], characterImage1[1],
				characterImage1[2], characterImage1[1], characterImage1[0],
			 	characterImage1[3], characterImage1[4], characterImage1[3],
			 	characterImage1[5]);
		/* 思考中のアニメーション */
		var thinkingEffect = new Array(thinkingEffect[0], thinkingEffect[1],
				thinkingEffect[2], thinkingEffect[0], thinkingEffect[1],
				thinkingEffect[3], thinkingEffect[0], thinkingEffect[1],
				thinkingEffect[4]);

		function animationLoop() {

			draw();

			frameCount++;
			rAF(animationLoop);
		}
		animationLoop();

		/* デモのアニメーション */
		/* 描画関数 */
		function draw() {

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "#ddd";
			ctx.fillRect(0, 0, width, height);

			makeStage();
			drawCharacter();
		}

		/* ステージの描画 */
		function makeStage() {

			ctx.beginPath();

			for (var i=0; i<16; i++) {
				ctx.drawImage(block1, 64 * i, 0);
				ctx.drawImage(block1, 64 * i, 448);
			}

			for (var i=0; i<6; i++) {
				ctx.drawImage(block1, 0, 64 * (i + 1));
				ctx.drawImage(block1, 960, 64 * (i + 1));
			}

			ctx.closePath();
		}

		/* キャラの描画 */
		function drawCharacter() {

			var x = 64 + frameCount;
			var y = height - 64 * 2;

			ctx.beginPath();

			if (frameCount % 1000 < 500) {
				character1.thinking();
			} else {
				character1.draw();
				character1.update();
			}
			
			ctx.closePath();
		}

		/* キャラのコンストラクタ */
		function Character1() {
			this.x = 64;
			this.rx = -this.x - 64; // 画像を反転したときのx座標
			this.y = height - 64 * 2;
			this.vx = 1; // キャラの動く速度
			this.imageNumber = 0;
			this.isReverse = false; // 画像が反転しているかいないか
			this.thinkNumber = 0;

			this.update = function () {

				this.x += this.vx;
				this.rx = -this.x - 64;
				this.thinkNumber = 0;

				/* キャラ絵の変更 */
				if (frameCount % 10 == 0) {
					this.imageNumber++;
					if (this.imageNumber > 7)
						this.imageNumber = 0;
				}

				if (this.x > width - 64 * 2) {
					this.vx = -this.vx;
					this.isReverse = true;
					this.imageNumber = 8;
				}
				if (this.x < 64) {
					this.vx = -this.vx;
					this.isReverse = false;
					this.imageNumber = 8;
				}
			}

			this.draw = function() {
				if (!this.isReverse) {
					ctx.drawImage(moveAnimation1[this.imageNumber], this.x, this.y);
				} else {
					ctx.save();
					ctx.scale(-1, 1);
					ctx.drawImage(moveAnimation1[this.imageNumber], this.rx, this.y);
					ctx.restore();
				}
			}

			this.thinking = function () {
				if (frameCount % 50 == 0) {
					this.thinkNumber++;
					if (this.thinkNumber > 8) {
						this.thinkNumber = 0;
					}
				}
				if (!this.isReverse) {
					ctx.drawImage(moveAnimation1[0], this.x, this.y);
					ctx.drawImage(thinkingEffect[this.thinkNumber],
													this.x, this.y);
				} else {
					ctx.save();
					ctx.scale(-1, 1);
					ctx.drawImage(moveAnimation1[0], this.rx, this.y);
					ctx.drawImage(thinkingEffect[this.thinkNumber],
													this.rx, this.ry);
					ctx.restore();
				}
			}	
		}