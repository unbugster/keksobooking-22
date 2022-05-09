const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileHousePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const AvatarSize = {
  WIDTH: 70,
  HEIGHT: 70,
};

const HousePhotoSize = {
  WIDTH: 70,
  HEIGHT: 70,
};

fileAvatarChooser.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((imageType) => fileName.endsWith(imageType));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
      avatarPreview.width = AvatarSize.WIDTH;
      avatarPreview.height = AvatarSize.HEIGHT;
    });
    reader.readAsDataURL(file);
  }
});

fileHousePhotoChooser.addEventListener('change', (evt) => {
  const files = evt.target.files;

  const filesArr = Array.from(files);
  filesArr.forEach((file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((imageType) => fileName.endsWith(imageType));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        housePhotoPreview.insertAdjacentHTML('beforeend', `<img src="${reader.result}" width="${HousePhotoSize.WIDTH}px" height="${HousePhotoSize.HEIGHT}px">`);
      });
      reader.readAsDataURL(file);
    }
  });
});
