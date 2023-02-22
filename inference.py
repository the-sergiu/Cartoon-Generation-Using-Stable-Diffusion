from ldm.generate import Generate

style_sp = "style_south_park2022-12-18T16-45-49_5000steps_southpark"
style_naruto = "style_naruto2023-01-15T00-29-30_naruto_7ksteps_init_naruto"
style_cartoon = "style_cartoons2022-12-20T18-37-23_15ksteps_cartoons"

# model configuration
gr = Generate(
    'stable-diffusion-1.5',
    embedding_path=f'./logs/{style_naruto}/checkpoints/embeddings.pt'  # modify the embedding path
)

# model loading
gr.load_model()

# variable initialization
text = "draw a library in the style of *"

# inference returns a list of tuple
results = gr.prompt2image(
    prompt   = text,
    outdir   = "./outputs/",
    iterations=1,
    steps=50
)

# save the image in outputs folder
for row in results:
    im   = row[0]
    seed = row[1]
    im.save(f'./outputs/image-draw_library-{seed}.png')