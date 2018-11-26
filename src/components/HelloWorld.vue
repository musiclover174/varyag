<template>
  <aside class="content__side">
    <button class="content__side-close" type="button"></button>
    <nav class="content__side-nav">
      <ul class="content__side-list">
        <li class="content__side-item">
          <a class="content__side-href active" href="#">№ 587498/17 от 28 сентября 2017г.</a>
          <ul class="content__side-sublist">
            <li class="content__side-subitem">
              <a class="content__side-subhref" href="#">Подпункт 1</a>
            </li>
            <li class="content__side-subitem">
              <a class="content__side-subhref" href="#">Подпункт 2</a>
            </li>
          </ul>
        </li>
        <li class="content__side-item">
          <a class="content__side-href" href="#">№1234556/16 от 15 ноября 2016г.</a>
        </li>
      </ul>
    </nav>
  </aside>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>
