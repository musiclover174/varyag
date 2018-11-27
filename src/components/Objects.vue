<template>
  <div class="container">
    <aside class="content__side">
      <button class="content__side-close" type="button"></button>
      <nav class="content__side-nav">
        <ul class="content__side-list">
          <li class="content__side-item">
            <router-link
              to="/objects/history"
              class="content__side-href"
              active-class="active"
              exact
            >История сигналов</router-link>
            <ul class="content__side-sublist">
              <li class="content__side-subitem">
                <a class="content__side-subhref" href="#">Производственная, 8а</a>
              </li>
              <li class="content__side-subitem">
                <a class="content__side-subhref" href="#">Лаборатория</a>
              </li>
            </ul>
          </li>
          <li class="content__side-item">
            <router-link
              to="/objects/responsible"
              class="content__side-href"
              active-class="active"
              exact
            >Ответственный</router-link>
          </li>
          <li class="content__side-item">
            <router-link
              to="/objects/users"
              class="content__side-href"
              active-class="active"
              exact
            >Пользователи</router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <span class="content__side-overlay"></span>

    <div class="content__main">
      <section class="top">
        <h1 class="top__title">Объекты</h1>
      </section>

    </div>
  </div>
</template>
