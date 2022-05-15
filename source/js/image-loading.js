const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileHousePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const AvatarSize = {
  WIDTH: 40,
  HEIGHT: 44,
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

const img = document.createElement('img');

fileHousePhotoChooser.addEventListener('change', (evt) => {
  housePhotoPreview.append(img);
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((imageType) => fileName.endsWith(imageType));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      img.src = reader.result;
      img.width = HousePhotoSize.WIDTH;
      img.height = HousePhotoSize.HEIGHT;
    });
    reader.readAsDataURL(file);
  }

});

const removeImages = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  img.remove();
};

export { removeImages };
